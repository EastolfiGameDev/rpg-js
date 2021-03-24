import { addWebComponent, WebComponentFactory } from '../factory';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
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
    </div>`;

    class StatsComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('stats-component', StatsComponent);
});
