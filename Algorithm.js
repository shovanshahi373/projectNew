const jobScheduler = function (d, j, r)  {
        let t1;
        let t2;
        let t3;
        const len = j.length-1;
        for (k=0; k<len; k++) {
            for(i=0; i<len-k; i++) {
                if(r[i]> r[i+1]) {
                    t1 = r[i];
                    t2 = j[i];
                    t3 = d[i];
                    r[i] = r[i+1];
                    r[i +1] = t1;
                    j[i] = j[i+1];
                    j[i +1] = t2;
                    d[i] = d[i+1];
                    d[i +1] = t3;
                   
                    
                }

            }
            
        }
    // for (i=0; i<j.length; i++) {
    //     console.log ( "jobs" + j[i] + "  deadline" +d[i] + "  res" + r[i]);

    // }
    let val = j.concat(d).concat(r);
    return Promise.resolve(val);
    //return (d,j,r);
    
}

let d =[3,5,2,7];
let j =[1,2,3,4];
let r =[6,2,7,4];

jobScheduler(d,j,r)
.then(result => {
    console.log(result.length);
    let n = result.length/3;
    const j = result.substr(0,n);
    const d= result.substr(n, 2*n);
    const r = result.substr(2*n, 3*n);
    
    for (let i=0; i<j.length; i++) {
            console.log ( j.length +"jobs" + j[i] + "  deadline" +d[i] + "  res" + r[i]);
    
        }
})
.catch(err=> {
    console.log(err);
});