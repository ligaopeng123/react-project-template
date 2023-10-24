import 'package:easy_refresh/easy_refresh.dart';

const EasyRefreshClassicHeader = ClassicHeader(
  dragText: '下拉刷新',
  armedText: '释放开始',
  processedText: '成功了',
  noMoreText: '没有更多内容',
  messageText: '更新于 %T',
  readyText: '刷新中...',
  processingText: '刷新中...',
  failedText: '失败了',
);

const EasyRefreshClassicFooter = ClassicFooter(
  dragText: '上拉加载',
  armedText: '释放开始',
  readyText: '加载中...',
  processingText: '加载中...',
  processedText: '成功了',
  noMoreText: '没有更多',
  failedText: '失败了',
  messageText: '最后更新于 %T',
);
