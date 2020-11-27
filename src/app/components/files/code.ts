export default `
<p>
  The bare minimum for using highlight.js on a web page is linking to the library along with one of the styles and calling
  <a href="http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload"><code>initHighlightingOnLoad</code></a
  >:
</p>
<pre><code class="language-html">&lt;link rel=&quot;stylesheet&quot; href=&quot;/path/to/styles/default.css&quot;&gt;
&lt;script src=&quot;/path/to/highlight.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
</code></pre>
<p>
  This will find and highlight code inside of <code>&lt;pre&gt;&lt;code&gt;</code> tags; it tries to detect the language automatically. If
  automatic detection doesn’t work for you, you can specify the language in the <code>class</code> attribute:
</p>
<pre><code class="language-html">&lt;pre&gt;&lt;code class=&quot;html&quot;&gt;...&lt;/code&gt;&lt;/pre&gt;
</code></pre>
`;
