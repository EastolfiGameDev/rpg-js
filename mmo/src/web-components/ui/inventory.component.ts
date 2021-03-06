import { addWebComponent, WebComponentFactory } from '../factory';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
    <div class="inventory" id="inventory">
        <div class="inventory-inner">
            <div class="inventory-title">Inventory</div>
            <div class="inventory-row">
                <div class="inventory-column">
                    <div class="inventory-item" id="inventory-equip-1" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-2" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-3" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-4" draggable="true"></div>
                </div>
                <div class="inventory-character"></div>
                <div class="inventory-column">
                    <div class="inventory-item" id="inventory-equip-5" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-6" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-7" draggable="true"></div>
                    <div class="inventory-item" id="inventory-equip-8" draggable="true"></div>
                </div>
            </div>
            <div class="inventory-row">
                <div class="inventory-item" id="inventory-1" draggable="true"></div>
                <div class="inventory-item" id="inventory-2" draggable="true"></div>
                <div class="inventory-item" id="inventory-3" draggable="true"></div>
                <div class="inventory-item" id="inventory-4" draggable="true"></div>
                <div class="inventory-item" id="inventory-5" draggable="true"></div>
                <div class="inventory-item" id="inventory-6" draggable="true"></div>
                <div class="inventory-item" id="inventory-7" draggable="true"></div>
                <div class="inventory-item" id="inventory-8" draggable="true"></div>
            </div>
            <div class="inventory-row">
                <div class="inventory-item" id="inventory-9" draggable="true"></div>
                <div class="inventory-item" id="inventory-10" draggable="true"></div>
                <div class="inventory-item" id="inventory-11" draggable="true"></div>
                <div class="inventory-item" id="inventory-12" draggable="true"></div>
                <div class="inventory-item" id="inventory-13" draggable="true"></div>
                <div class="inventory-item" id="inventory-14" draggable="true"></div>
                <div class="inventory-item" id="inventory-15" draggable="true"></div>
                <div class="inventory-item" id="inventory-16" draggable="true"></div>
            </div>
            <div class="inventory-row">
                <div class="inventory-item" id="inventory-17" draggable="true"></div>
                <div class="inventory-item" id="inventory-18" draggable="true"></div>
                <div class="inventory-item" id="inventory-19" draggable="true"></div>
                <div class="inventory-item" id="inventory-20" draggable="true"></div>
                <div class="inventory-item" id="inventory-21" draggable="true"></div>
                <div class="inventory-item" id="inventory-22" draggable="true"></div>
                <div class="inventory-item" id="inventory-23" draggable="true"></div>
                <div class="inventory-item" id="inventory-24" draggable="true"></div>
            </div>
        </div>
    </div>`;

    class InventoryComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('inventory-component', InventoryComponent);
});
