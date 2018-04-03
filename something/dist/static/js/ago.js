var byTime = [365*24*60*60*1000,30*24*60*60*1000,24*60*60*1000,60*60*1000,60*1000,1000];  
var unit = ["年","月","天","小时","分钟","秒钟"];  
const ago = (atime) => {
    
    var ct = new Date().getTime()-Date.parse(atime);  
    if(ct<0){  
        return "瞎糊闹！"  
    }  
  
    var theTime = [];  
    for(var i=0;i<byTime.length;i++){  
    if(ct<byTime[i]){  
        continue;  
    }  
    var temp = Math.floor(ct/byTime[i]);  
    ct = ct%byTime[i];  
    if(temp>0){  
        theTime.push(temp+unit[i]);  
    }  
  
  
    /*一下控制最多输出几个时间单位： 
        一个时间单位如：N分钟前 
        两个时间单位如：M分钟N秒前 
        三个时间单位如：M年N分钟X秒前 
    以此类推 
    */  
        if(theTime.length>=1){  
            break;  
        }  
    }  
    return (theTime.join("")+"前");  
}

export default ago;
