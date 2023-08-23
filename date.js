const helper = {
    the: function res(){
        console.log("the");
        res()
        }
}

export const the = helper.the;
