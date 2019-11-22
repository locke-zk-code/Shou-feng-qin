export default function (obj) {
  // 检测并初始化obj对象
  try {
    // 必填属性
    if (!obj.el) throw Error('未设置 el 属性');

    if (!obj.imgs) throw Error('未指定展示的图片');

    if (!obj.width) throw Error('未指定展示图片的展示宽度');

    if (!obj.urls) throw Error('未指定链接 url');

    // 非必填属性
    if (!obj.tag) obj.tag = 'a';

    if (!obj.minWidth) obj.minWidth = '50px';

    if (!obj.time) obj.time = 2000;
  }
  catch (e) {
    throw e;
  }

  // 根元素，手风琴容器
  var rootContainer = null;

  // 根元素的高度
  var rootContainerHeight = "";

  // 展示图片容器
  var pictureContainer = null;

  // 展示列表的数目
  var listNumber = 0;

  // 列表项
  var lists = null;

  // 当前展示图片的索引
  var currentImageIndex = 0;

  // 定时器
  var timer = setInterval(autoPlay, obj.time);

  // 定时器所用到的索引
  var timerIndex = 0;

  // 获取根元素
  rootContainer = document.querySelector(obj.el);

  // 设置根元素的样式
  rootContainer.style.position = 'relative';

  rootContainer.style.overflow = 'hidden';

  // 获取根元素的高度
  rootContainerHeight = rootContainer.offsetHeight + 'px';

  // 计算列表数目
  listNumber = obj.imgs.length;

  // 创建列表元素，设置列表元素的样式，并将其添加到根元素内
  for (let i = 0; i < listNumber; i++) {
    // 创建列表元素
    pictureContainer = document.createElement(obj.tag);

    // 设置列表元素的样式
    pictureContainer.style.display = 'inline-block';

    pictureContainer.style.position = 'absolute';

    pictureContainer.style.top = 0;

    if (i !== 0) {
      // i - 1 的目的是为了解决第二个列表与第一个列表之间有空隙的问题
      pictureContainer.style.left = parseInt(obj.width) + ((i - 1) * parseInt(obj.minWidth)) + 'px';
    }

    pictureContainer.style.width = obj.width;

    pictureContainer.style.height = rootContainerHeight;

    pictureContainer.style.backgroundImage = 'url(' + obj.imgs[i] + ')';

    pictureContainer.style.backgroundSize = obj.width + ' ' + rootContainerHeight;

    pictureContainer.style.cursor = 'pointer';

    // 给列表设置一些私有自定义属性
    // left：保存列表的左移像素数值
    pictureContainer.dataset.left = pictureContainer.style.left;

    // isRight：当列表处于当前展示图片的右边时，值为 true，否则值为 false
    if (i === 0) {
      pictureContainer.dataset.isRight = 'true';
    } else {
      pictureContainer.dataset.isRight = 'false';
    }

    // 将列表添加到根元素内
    rootContainer.appendChild(pictureContainer);
  }

  // 获取所有列表项
  lists = rootContainer.childNodes;

  // 为列表项添加鼠标移入、移出、点击事件
  lists.forEach(function (value, index) {
    value.addEventListener('mouseenter', function () {
      let isRight = this.dataset.isRight;

      // 暂停定时器，并把 index 值赋值给 timerIndex
      timerIndex = index;
      clearInterval(timer);

      if (isRight === 'false') {
        for (let i = currentImageIndex; i <= index; i++) {
          // 给鼠标悬停的列表以及前几个列表添加左移操作
          lists[i].style.left = i * parseInt(obj.minWidth) + 'px';

          // 过渡一下左移操作
          lists[i].style.transition = 'left .8s';

          // 把 isRight 自定义属性修改 true
          lists[i].dataset.isRight = 'true';
        }

      } else {
        // index + 1 的目的因为鼠标移入的列表将要被展示，所以要操作下一个列表
        for (let i = index + 1; i <= currentImageIndex; i++) {
          // 给鼠标悬停的列表之后的所有列表添加左移操作，左移值为列表的 left 自定义属性
          lists[i].style.left = lists[i].dataset.left;

          // 把 isRight 自定义属性修改为 false
          lists[i].dataset.isRight = 'false';
        }
      }

      // 修改当前展示图片的索引
      currentImageIndex = index;
    });

    value.addEventListener('mouseleave', function () {
      // 启用定时器
      timer = setInterval(autoPlay, obj.time);
    })

    value.addEventListener('click', function () {
      window.location.href = obj.urls[index];
    })
  });

  // 自动播放函数
  function autoPlay() {
    timerIndex++;

    if (timerIndex === listNumber) {
      // 重置索引
      timerIndex = 0;

      // 重置列表的位置
      for (let i = 1; i < listNumber; i++) {
        lists[i].style.left = lists[i].dataset.left;

        lists[i].dataset.isRight = 'false';
      }

      currentImageIndex = timerIndex;
    }

    lists[timerIndex].style.left = timerIndex * parseInt(obj.minWidth) + 'px';

    lists[timerIndex].style.transition = 'left .8s';

    lists[timerIndex].dataset.isRight = 'true';

    currentImageIndex = timerIndex;
  }
}
