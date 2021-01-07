import { ObjectDirective } from "vue";

/**
 * 使用该命令会将元素变成绝对定位
*/
const draggable: ObjectDirective = {
  mounted: function (el: HTMLDivElement) {
    el.style.cursor = "move";
    el.style.position = "absolute";
    el.onmousedown = function (e) {
      // const [offerX, offerY] = el.style.webkitTransform.match(/\d+/g) || [0, 0];
      // const disx = e.pageX - el.offsetLeft - offerX;
      // const disy = e.pageY - el.offsetTop - offerY;
      const disx = e.pageX - el.offsetLeft;
      const disy = e.pageY - el.offsetTop;
      // console.log("dis", disx, disy);
      document.onmousemove = function (e) {
        let x = e.pageX - disx;
        let y = e.pageY - disy;
        const maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width);
        const maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height);
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        // el.style = `transform: translate(${x}px, ${y}px);`;
        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

export default draggable;
