/* global NexT: true */

$(document).ready(function () {

  $(document).trigger('bootstrap:before');


  var str = navigator.userAgent.toLowerCase();
  var ver = str.match(/cpu iphone os (.*?) like mac os/);
  if(NexT.utils.isMobile()){
    //如果非IOS系统或者IOS11以下启用此插件
    //解决手机上的浏览器为了识别双击和单击而加了300毫秒延迟的插件
    if(!ver){
      // 引入fastclick文件
      NexT.utils.isMobile() && window.FastClick.attach(document.body);
    }else if(parseInt(ver[1]) < 11){
      NexT.utils.isMobile() && window.FastClick.attach(document.body);
    }
  }else{
    //由于手机端公共聊天室的大小不能自适应，所以只在pc端加载
    $(document.head).append('<script type="text/javascript" src="http://meet.xpro.im/v2/api/xmeet.api.js?xnest=yourNameSpace&xnest_name=Choice\'s Blog"></script>');
  }

  NexT.utils.lazyLoadPostsImages();

  NexT.utils.registerESCKeyEvent();

  NexT.utils.registerBackToTop();

  // Mobile top menu bar.
  $('.site-nav-toggle button').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.tabs && NexT.utils.registerTabsTag();

  NexT.utils.embeddedVideoTransformer();
  NexT.utils.addActiveClassToMenuItem();


  // Define Motion Sequence.
  NexT.motion.integrator
    .add(NexT.motion.middleWares.logo)
    .add(NexT.motion.middleWares.menu)
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar);

  $(document).trigger('motion:before');

  // Bootstrap Motion.
  CONFIG.motion.enable && NexT.motion.integrator.bootstrap();

  $(document).trigger('bootstrap:after');
});
