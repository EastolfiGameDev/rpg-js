export type WebComponentFactory = (selector: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions) => void;

export function addWebComponent(callback: (factory: WebComponentFactory) => void): void {
    callback((selector: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions) => {
        customElements.define(selector, constructor, options);
    });
}
