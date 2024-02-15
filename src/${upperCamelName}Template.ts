/**********************************************************************
 *
 * @模块名称: <%= upperCamelName %>Template
 *
 * @模块用途: <%= upperCamelName %>Template
 *
 * @创建人: <%= username %>
 *
 * @date: <%= time %>
 *
 **********************************************************************/

export const template = (config) => {
    return `
        <style>
            .container {
                
            }
        </style>
        <div class="container">
            <slot name="content"></slot>
        <div
    `
}