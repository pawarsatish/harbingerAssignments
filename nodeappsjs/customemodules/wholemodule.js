module.exports = {
    getFile:function(filename){
        var Urls = [
            "/about",
            "/home",
            "/contact",
            "/products"
        ];
        var PageName;
        PageName = Urls.filter((file)=>{
            return file == filename;
        });
        return PageName;
    }
};