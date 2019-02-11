var Products = [
    {id:101,name:"P1"},
    {id:102,name:"P2"},
    {id:103,name:"P3"},
    {id:104,name:"P4"},
    {id:105,name:"P5"}
];

module.exports = {
        getData:function(){
            return Products;
        },
        getDataById:function(id){
            return Products.filter((prod)=>{
                return prod.id == id;
            });
        },
        addData:function(prd){
            Products.push(prd);
            return Products;
        },
        updateData:function(prod){
            Products.forEach(element => {
                if(element.id == prod.id){
                    element.id = prod.id,
                    element.name = prod.name
                }
            });
            return Products;
        },
        deleteData:function(id){
            var index;
            var obj = Products.filter((prod,idx)=>{
                if(prod.id == id){
                    index = idx;
                }
            });
            Products.splice(index,1);
            return Products;
        }
    };