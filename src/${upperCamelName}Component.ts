/**********************************************************************
 *
 * @模块名称: <%= upperCamelName %>Component
 *
 * @模块用途: <%= upperCamelName %>Component
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/

import { template } from "./<%= upperCamelName %>Template";

class <%= upperCamelName %> extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    __config = {
    }

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = template(this.config);
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.init();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.destroy();
    }
    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
        }
    }
    /**
     * 初始化
     */
    init = ()=> {

    }
    /**
     * 事件销毁
     */
    destroy = ()=> {

    }
}

export default <%= upperCamelName %>;

if (!customElements.get("<%= name %>")) {
    customElements.define("<%= name %>", <%= upperCamelName %>);
}
