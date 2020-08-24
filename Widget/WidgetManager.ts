import * as _ from 'lodash';
import WidgetInterface from "@enhavo/dashboard/Widget/WidgetInterface";
import WidgetRegistry from "@enhavo/dashboard/Widget/WidgetRegistry";
import ComponentRegistryInterface from "@enhavo/core/ComponentRegistryInterface";

export default class WidgetManager
{
    public readonly widgets: WidgetInterface[];
    private readonly registry: WidgetRegistry;
    private readonly componentRegistry: ComponentRegistryInterface;

    constructor(widgets: WidgetInterface[], registry: WidgetRegistry, componentRegistry: ComponentRegistryInterface)
    {
        this.registry = registry;
        this.widgets = widgets;
        this.componentRegistry = componentRegistry;
    }

    init() {
        for (let i in this.widgets) {
            let widget = this.registry.getFactory(this.widgets[i].component).createFromData(this.widgets[i]);
            _.extend(this.widgets[i], widget);
        }

        for (let component of this.registry.getComponents()) {
            this.componentRegistry.registerComponent(component.name, component.component)
        }

        this.componentRegistry.registerData(this.widgets);
        this.componentRegistry.registerStore('widgetManager', this);
    }
}
