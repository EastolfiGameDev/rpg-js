// IDs
const container = 'game-ui';

const template = `
<div class="ui" id="${container}">
    <div class="icon-bar" id="icon-bar">
        <div class="icon-bar-item" id="icon-bar-stats"
            style="background-image: url('./resources/icons/ui/skills.png');"></div>
        <div class="icon-bar-item" id="icon-bar-inventory"
            style="background-image: url('./resources/icons/ui/backpack.png');"></div>
        <div class="icon-bar-item" id="icon-bar-quests"
            style="background-image: url('./resources/icons/ui/tied-scroll.png');"></div>
    </div>
    <div class="health-ui">
        <div class="health-bar" id="health-bar"></div>
    </div>
    <div class="quest-journal" id="quest-journal"></div>
    <div class="quest-ui-layout" id="quest-ui">
        <div class="quest-ui">
            <div class="quest-text-title" id="quest-text-title"></div>
            <div class="quest-text" id="quest-text"></div>
        </div>
    </div>

    <div class="stats" id="stats">
        <div class="stats-inner">
            <div class="stats-title">Statistics</div>
            <div class="stats-row">
                <div class="stats-tooltip">Strength
                    <div class="stats-tooltiptext">How strong you are, affects how much damage you do. So blah
                        blah if you're doing stuff then its stronger or whatever, the damage is up. This is text
                        to show the tooltip.</div>
                </div>
                <div id="stats-strength">0</div>
            </div>
            <div class="stats-row">
                <div class="stats-tooltip">Wisdomness
                    <div class="stats-tooltiptext">Wisdom is the guage of something to do with wisdom in the
                        game because wisdom is important and wisdom is wise to wisdoming.</div>
                </div>
                <div id="stats-wisdomness">0</div>
            </div>
            <div class="stats-row">
                <div class="stats-tooltip">Benchpress
                    <div class="stats-tooltiptext">Gotta have a good bench to be a warrior or something.</div>
                </div>
                <div id="stats-benchpress">0</div>
            </div>
            <div class="stats-row">
                <div class="stats-tooltip">Curl
                    <div class="stats-tooltiptext">The ultimate expression of strength, this affects literally
                        everything in your life.</div>
                </div>
                <div id="stats-curl">0</div>
            </div>
            <div class="stats-row">
                <div class="stats-tooltip">XP
                    <div class="stats-tooltiptext">How much xp you've accumulated by killing things for xp. Get
                        enough and you'll gain a level or something.</div>
                </div>
                <div id="stats-experience">0</div>
            </div>
        </div>
    </div>

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
    </div>

    <div class="chat-ui">
        <div class="chat-ui-text-area" id="chat-ui-text-area">
            <input class="chat-text chat-input" id="chat-input" maxLength="64" type="text"></input>
        </div>
    </div>
</div>`;

class GameUIComponent extends HTMLElement {
    public connectedCallback() {
        this.innerHTML = template;
    }
}

export function show(): string {
    return document.getElementById(container).style.visibility = 'visible';
}
export function hide(): string {
    return document.getElementById(container).style.visibility = 'hidden';
}

customElements.define('game-ui-component', GameUIComponent);