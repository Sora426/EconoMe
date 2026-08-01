function startMoneyRain(){

    const container=document.getElementById("money-rain");

    let interval=setInterval(()=>{

        const bill=document.createElement("div");

        bill.className="money";

        bill.innerHTML="💵";

        bill.style.left=Math.random()*100+"vw";

        bill.style.animationDuration=(Math.random()*2+3)+"s";

        bill.style.fontSize=(Math.random()*18+22)+"px";

        container.appendChild(bill);

        setTimeout(()=>{

            bill.remove();

        },5000);

    },70);

    setTimeout(()=>{

        clearInterval(interval);

    },4000);

}