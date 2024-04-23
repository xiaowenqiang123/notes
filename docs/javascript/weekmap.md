# WeekMap
通常，当对象、数组之类的数据结构在内存中时，它们的子元素，如对象的属性、数组的元素都被认为是可达的。

例如，如果把一个对象放到一个数组中，即使把对象只为<code>null</code>，目的想让垃圾回收机制回收掉，但是由于数组中还有对当前这个对象的引用，垃圾回收机制并不会回收，即使它置为<code>null</code>了

```js
let obj = { age: 1 }
const arr = [obj]
obj = null
console.log(arr[0]) // {age:1}
```
类似的我们使用Map也是同样的道理
```js
let obj = { age: 1 }
const map = new Map([[obj, '...']])
obj = null
console.log(map.keys()) //[Map Iterator] { { age: 1 } }
```
以上存在的问题我们都可以通过<code>WeekMap</code>来解决

与 <code>Map</code>的区别点：

1. <code>WeekMap</code>的key必须是对象，不能是原始值。
2. <code>WeekMap</code>不能被迭代 以及对应的<code>keys()</code>,<code>values()</code>,<code>entries()</code>是不能被调用的，其他方法是可以正常使用的

为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 john），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道 何时会被回收。

这些都是由 JavaScript 引擎决定的。JavaScript 引擎可能会选择立即执行内存清理，如果现在正在发生很多删除操作，那么 JavaScript 引擎可能就会选择等一等，稍后再进行内存清理。因此，从技术上讲，WeakMap 的当前元素的数量是未知的。JavaScript 引擎可能清理了其中的垃圾，可能没清理，也可能清理了一部分。因此，暂不支持访问 WeakMap 的所有键/值的方法。

# 实践
一般<code>weekMap</code>用来临时保存数据的。

1. 缓存计算结果
```js
const cache = new WeakMap();

function fibonacci(n) {
  if (n < 2) return n;
  if (cache.has(n)) return cache.get(n);
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  cache.set(n, result);
  return result;
}

```
