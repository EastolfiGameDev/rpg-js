export function LogMethod() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`[LOGGER] calling method ${target.constructor.name}#${propertyKey}`);
    }
}
