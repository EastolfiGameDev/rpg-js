import { Entity } from 'core/entities/entity';
import { MathUtils } from 'core/utils/math.utils';

// export interface GridEntity {
//     id: number;
// }

export interface GridClient {
    position: number[];
    dimensions: number[];
    cells: {
        min: number[],
        max: number[],
        nodes: GridCell[][]
    };
    queryId: number;
    entity?: Entity;
}

interface GridCell {
    next: GridCell;
    previous: GridCell;
    client: GridClient;
}

export class SpatialHashGrid {
    private cells: GridCell[][];
    private dimensions: number[];
    private bounds: number[][];
    private queryIds = 0;

    constructor(bounds: number[][], dimensions: number[]) {
        const [x, y] = dimensions;

        // creates an array of X by Y elements (X elements with each an array of Y elements)
        this.cells = [...Array(x)].map(_ => [...Array(y)].map(_ => (null)));

        this.dimensions = dimensions;
        this.bounds = bounds;
    }

    public newClient(position: number[], dimensions: number[]): GridClient {
        const client: GridClient = {
            position,
            dimensions,
            cells: {
                min: null,
                max: null,
                nodes: null
            },
            queryId: -1
        };

        this.insert(client);

        return client;
    }

    public updateClient(client: GridClient): void {
        const [posX, posY] = client.position;
        const [width, height] = client.dimensions;

        const indexInit = this.getCellIndex([posX - width / 2, posY - height / 2]);
        const indexEnd = this.getCellIndex([posX + width / 2, posY + height / 2]);

        if (client.cells.min[0] == indexInit[0] &&
            client.cells.min[1] == indexInit[1] &&
            client.cells.max[0] == indexEnd[0] &&
            client.cells.max[1] == indexEnd[1]) {

            return;
        }

        this.removeClient(client);
        this.insert(client);
    }

    public removeClient(client: GridClient): void {
        const indexInit = client.cells.min;
        const indexEnd = client.cells.max;

        for (let xInit = indexInit[0], xEnd = indexEnd[0]; xInit <= xEnd; xInit++) {
            for (let yInit = indexInit[1], yEnd = indexEnd[1]; yInit <= yEnd; yInit++) {
                const xi = xInit - indexInit[0];
                const yi = yInit - indexInit[1];
                const node = client.cells.nodes[xi][yi];

                if (node.next) {
                    node.next.previous = node.previous;
                }
                if (node.previous) {
                    node.previous.next = node.next;
                }

                if (!node.previous) {
                    this.cells[xInit][yInit] = node.next;
                }
            }
        }

        client.cells.min = null;
        client.cells.max = null;
        client.cells.nodes = null;
    }

    public findNearby(position: number[], bounds: number[]): GridClient[] {
        const [posX, posY] = position;
        const [width, height] = bounds;

        const indexInit = this.getCellIndex([posX - width / 2, posY - height / 2]);
        const indexEnd = this.getCellIndex([posX + width / 2, posY + height / 2]);

        const clients: GridClient[] = [];
        const queryId = this.queryIds++;

        for (let xInit = indexInit[0], xEnd = indexEnd[0]; xInit <= xEnd; xInit++) {
            for (let yInit = indexInit[1], yEnd = indexEnd[1]; yInit <= yEnd; yInit++) {
                let head = this.cells[xInit][yInit];

                while (head) {
                    const client = head.client;
                    head = head.next;

                    if (client.queryId !== queryId) {
                        client.queryId = queryId;
                        clients.push(client);
                    }
                }
            }
        }

        return clients;
    }

    private insert(client: GridClient): void {
        const [posX, posY] = client.position;
        const [width, height] = client.dimensions;

        const indexInit = this.getCellIndex([posX - width / 2, posY - height / 2]);
        const indexEnd = this.getCellIndex([posX + width / 2, posY + height / 2]);

        const nodes: GridCell[][] = [];

        for (let xInit = indexInit[0], xEnd = indexEnd[0]; xInit <= xEnd; xInit++) {
            nodes.push([]);

            for (let yInit = indexInit[1], yEnd = indexEnd[1]; yInit <= yEnd; yInit++) {
                const xIndex = xInit - indexInit[0];

                const head: GridCell = {
                    next: null,
                    previous: null,
                    client
                };
                nodes[xIndex].push(head);

                head.next = this.cells[xInit][yInit];

                if (this.cells[xInit][yInit]) {
                    this.cells[xInit][yInit].previous = head;
                }

                this.cells[xInit][yInit] = head;
            }
        }

        client.cells.min = indexInit;
        client.cells.max = indexEnd;
        client.cells.nodes = nodes;
    }

    private getCellIndex(position: number[]): number[] {
        const x = MathUtils.sat(
            (position[0] - this.bounds[0][0]) /
            (this.bounds[1][0] - this.bounds[0][0])
        );
        const y = MathUtils.sat(
            (position[1] - this.bounds[0][1]) /
            (this.bounds[1][1] - this.bounds[0][1])
        );

        const xIndex = Math.floor(x * this.dimensions[0] - 1);
        const yIndex = Math.floor(y * this.dimensions[1] - 1);

        return [xIndex, yIndex];
    }
}
