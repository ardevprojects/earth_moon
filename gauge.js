const panel = document.querySelector('.gauges');
const options = { attributes: true }
const percentage = document.querySelectorAll('.percent');
const gauges = Array(percentage.length);
gauges.fill(0);
const intervals = Array(gauges.length);
const xl = document.querySelectorAll('.xl');
const l = document.querySelectorAll('.l');
const m = document.querySelectorAll('.m');
const s = document.querySelectorAll('.s');

const showGauges = () => {
    percentage.forEach((percent, i) => {
        const number = percent.dataset.num;
        intervals[i] = setInterval(() => {
            if (gauges[i] === parseInt(number)) {
                clearInterval(gauges[i]);
            } else {
                gauges[i]++;
                percent.innerHTML = `<h2>${gauges[i]} %</h2>`;
                xl[i].style.strokeDashoffset = Math.floor(881 - (8.8 * parseFloat(gauges[i])));
                l[i].style.strokeDashoffset = Math.floor(816 - (8.16 * parseFloat(gauges[i])));
                m[i].style.strokeDashoffset = Math.floor(626 - (6.26 * parseFloat(gauges[i])));
                s[i].style.strokeDashoffset = Math.floor(528 - (5.28 * parseFloat(gauges[i])));
            }
        }, 10);
    });
}

const mutationObserver = (mutationList, observer) => {
    mutationList.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setTimeout(showGauges, 800)
        }
    })
}

const observer = new MutationObserver(mutationObserver);

observer.observe(panel, options);