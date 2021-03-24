import { addWebComponent, WebComponentFactory } from '../factory';

addWebComponent((factory: WebComponentFactory) => {
    const template = `
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
    </div>`;

    class GuiComponent extends HTMLElement {
        public connectedCallback() {
            this.innerHTML = template;
        }
    }

    factory('gui-component', GuiComponent);
});
