<h2><b>Cross-sell Products Add-on for Magento 2 PWA Studio</b></h2>

<p>For Magento 2 PWA Studio, there is no cross-selling product feature available for now on the cart page. The <b>Cross-sell Products Add-on</b> is the same as impulse buying of a product or a service made just before the checkout process. This add-on is displayed on the cart page and it's fully responsive, which ultimately makes it compatible with most mobile devices.</p>

<h3><b>Pre-requirements</b></h3>
<ul>
<li>Magento 2.3.* or 2.4.*</li>
</ul>

<h3><b>Installation Instruction</b></h3>
<ol>
<li>Copy <b>@mage2</b> directory files and folders inside the <b>src</b> directory, for example:<br/> <pre>{pwa-root-dir}/packages/{custom-package}/@mage2</pre></li>
<li>Add the Cross-sell Products add-on dependency in the <b>package.json</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/package.json
<pre>
"dependencies": {
    ...
    "@mage2": "link:src/@mage2",
    "crosssell-products": "link:src/@mage2/crosssell-products"
},
</pre>
</li>
<li>Run the following command inside your custom package or venia-concept directory:
<pre>yarn install</pre>
</li>
<li><b>CartPage React component</b> is responsible to handle cart page layout in Magento 2 PWA Storefront. To add Cross-sell Products add-on on cart page, you need to add following code inside the <b>local-intercept.js</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/src/targets/local-intercept.js
<pre>
const CartPageComponent = targetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/cartPage.js'
);

const CrosssellProducts = CartPageComponent.addImport(
    "Crosssell from '@mage2/crosssell-products'"
);

CartPageComponent.appendJSX('div className={classes.body}', \`<${CrosssellProducts} />\`);
</pre>
</li>
<li>Run the PWA storefront using following command:<br/>
<pre>yarn {custom-package} run build && yarn {custom-package} run watch</pre>
<b>Note:</b> Replace {custom-package} with your custom package name or venia package i.e.
<pre>yarn example-concept run build && yarn example-concept run watch</pre> or
<pre>yarn venia run build && yarn venia run watch</pre>
</li>
</ol>

<h3><b>Features</b></h3>
<ul>
<li>Easy to install</li>
<li>Cross-sell products are shown on cart page</li>
<li>Fully responsive</li>
</ul>

<p>In case of any other queries regarding this add-on:<br />
Contact us at <b>mage2developer@gmail.com</b>. We would be really happy to help :)</p>

<h3><b>Screen Shots</b></h3>

<img src="https://user-images.githubusercontent.com/17154042/141428214-1bd74b92-0b00-4064-b991-f8fbc99a77f1.png" alt="desktop-size" />

<img src="https://user-images.githubusercontent.com/17154042/141428220-4ce5b7f9-4784-41d8-a48f-eeac763377e2.png" alt="mobile-size" />
