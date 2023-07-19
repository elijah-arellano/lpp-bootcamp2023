var products = [
    { id: 6, name: 'Pen', cost: 50, units: 20, category: 'stationary' },
    { id: 9, name: 'Ten', cost: 70, units: 70, category: 'stationary' },
    { id: 3, name: 'Len', cost: 60, units: 60, category: 'grocery' },
    { id: 5, name: 'Zen', cost: 30, units: 30, category: 'grocery' },
    { id: 1, name: 'Ken', cost: 20, units: 80, category: 'utencil' },
    { id: 7, name: 'Mouse', cost: 100, units: 20, category: 'electronics' }
];

function useCase(title, fn){
    console.group(title)
    fn()
    console.groupEnd();
}

useCase('Initial List', function(){
    console.table(products);
})
    
useCase('Sort', function(){
    useCase('Default Sort [products by id]', function(){
        function sortProductsById(){
            for(var i =0;i < products.length-1; i++)
                for(var j = i +1; j < products.length; j++)
                    if (products[i].id > products[j].id) {
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sortProductsById()
        console.table(products)
    })
    useCase('Genaralized Sort', function(){
        /* 
        function sort(list, by){
            if (typeof by === 'string'){
                for(var i =0;i < list.length-1; i++)
                    for(var j = i +1; j < list.length; j++)
                        if (list[i][by] > list[j][by]) {
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }
            if (typeof by === 'function'){
                for(var i =0;i < list.length-1; i++)
                    for(var j = i +1; j < list.length; j++)
                        if ( by(list[i], list[j]) > 0  ) {
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }
        } 
        */
        function sort(list, by){
            var comparerFn = null;
            if (typeof by === 'function') comparerFn = by;
            if (typeof by === 'string') {
                comparerFn = function(item1, item2){
                    if (item1[by] < item2[by]) return -1;
                    if (item1[by] === item2[by]) return 0;
                    return 1;
                }
            }
            if (!comparerFn) return
            for(var i =0;i < list.length-1; i++)
                for(var j = i +1; j < list.length; j++)
                    if ( comparerFn(list[i], list[j]) > 0) {
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
            
        }
        useCase('Any list by any attribute', function(){
            function sortByAttr(list, attrName){
                for(var i =0;i < list.length-1; i++)
                    for(var j = i +1; j < list.length; j++)
                        if (list[i][attrName] > list[j][attrName]) {
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }

            useCase('Products by cost', function(){
                //sortByAttr(products, 'cost')
                sort(products, 'cost')
                console.table(products);
            })
            useCase('Products by units', function(){
                //sortByAttr(products, 'units')
                sort(products, 'units')
                console.table(products);
            })
        })
        useCase('Any list by any comparer', function(){
            function sortByComparer(list, comparerFn){
                for(var i =0;i < list.length-1; i++)
                    for(var j = i +1; j < list.length; j++)
                        if ( comparerFn(list[i], list[j]) > 0  ) {
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }
            useCase('products by product value [cost * units]', function(){
                function productsComparerByValue(p1, p2){
                    var p1Value = p1.cost * p1.units,
                        p2Value = p2.cost * p2.units;
                    if (p1Value < p2Value) return -1;
                    if (p1Value === p2Value) return 0;
                    return 1;
                }
                // sortByComparer(products, productsComparerByValue)
                sort(products, productsComparerByValue)
                console.table(products)
            })
        })
    })
})

useCase('Filter', function(){
    useCase('Concrete Implementations', function(){
        useCase('Filter stationary products [category = stationary]', function(){
            function filterStationaryProducts(){
                var result = [];
                for (var i = 0;i < products.length; i++){
                    if (products[i].category === 'stationary')
                        result.push(products[i])
                }
                return result
            }
            var stationaryProducts = filterStationaryProducts()
            console.table(stationaryProducts)
        });
        useCase('Filter costly products [cost > 50]', function(){
            function filterCostlyProducts(){
                var result = [];
                for (var i = 0;i < products.length; i++){
                    if (products[i].cost > 50)
                        result.push(products[i])
                }
                return result
            }
            var costlyProducts = filterCostlyProducts()
            console.table(costlyProducts)
        })
    })
    useCase('Abstract Implementation', function(){
        function filter(list, predicate){
             var result = [];
                for (var i = 0;i < list.length; i++){
                    if (predicate(list[i]) === true)
                        result.push(list[i])
                }
                return result
        }
        useCase('Any list by any criteria', function(){
            useCase('Filter stationary products [category = stationary]', function(){
                function stationaryProductPredicate(product){
                    return product.category === 'stationary'
                }
                var stationaryProducts = filter(products, stationaryProductPredicate)
                console.table(stationaryProducts);
            });
            useCase('Filter costly products [cost > 50]', function(){
                function costlyProductPredicate(product){
                    return product.cost > 50
                }
                var costlyProducts = filter(products, costlyProductPredicate)
                console.table(costlyProducts)
            })
        })
    })

})