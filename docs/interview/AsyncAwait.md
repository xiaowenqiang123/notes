# 如何实现模拟async await 的自执行
```ts
function asyncToGenerator(generatorFunction: (...ags: any) => any) {
    return function () {
        const gen = generatorFunction.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step(key, args?) {
                let generatorResult
                try {
                    generatorResult = gen[key](args)
                } catch (error) {
                    reject(reject)
                }
                const { value, done } = generatorResult
                if (done) {
                    resolve(value)
                } else {
                    return Promise.resolve(value).then(val => step('next', val)).catch((error) => {
                        // Generator.prototype.throw() 抛出的错误会被其内部捕获到
                        // 因此执行下面就会进入catch函数体
                        step('throw', error)
                    })
                }

            }
            step('next')
        })
    }
}
```