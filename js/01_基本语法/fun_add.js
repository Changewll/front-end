function add(a, b){
    if(add.length != arguments.length){
        throw new Error("形参和实参数量不一致，请重新调用函数！");
    }
    else{
        return a+b;
    }

}


