import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';


/// 通过 [BrnPageLoading] 构建出的加载状态的弹窗，加载动画和加载文字并排展示，且在屏幕中间。可通
/// 过 [BrnLoadingDialog.show] 和 [BrnLoadingDialog.dismiss] 控制弹窗的显示和关闭。不会自动关闭。
class SearchLoading extends Dialog {
  /// tag 用于在 BrnSafeDialog 中标记类型
  static const String _loadingDialogTag = '_loadingDialogTag';

  /// 加载时的提示文案，默认为 `加载中...`
  final String? content;

  const SearchLoading({Key? key, this.content}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BrnPageLoading(content: content ?? BrnIntl.of(context).localizedResource.loading);
  }

  /// 展示加载弹窗的静态方法。
  ///
  ///  * [context] 上下文
  ///  * [content] 加载时的提示文案
  ///  * [barrierDismissible] 点击蒙层背景是否关闭弹窗，默认为 true，可关闭，详见 [showDialog] 中的 [barrierDismissible]
  ///  * [useRootNavigator] 把弹窗添加到 [context] 中的 rootNavigator 还是最近的 [Navigator]，默认为 true，添加到
  ///    rootNavigator，详见 [showDialog] 中的 [useRootNavigator]。
  static Future<T?> show<T>(
      BuildContext context, {
        String? content,
        bool barrierDismissible = true,
        bool useRootNavigator = true,
      }) {
    return BrnSafeDialog.show<T>(
        context: context,
        tag: _loadingDialogTag,
        barrierDismissible: barrierDismissible,
        useRootNavigator: useRootNavigator,
        barrierColor: Colors.transparent,
        builder: (_) {
          return SearchLoading(content: content ?? BrnIntl.of(context).localizedResource.loading);
        });
  }

  /// 关闭弹窗。
  ///
  ///  * [context] 上下文。
  static void dismiss<T extends Object?>(BuildContext context, [T? result]) {
    BrnSafeDialog.dismiss<T>(context: context, tag: _loadingDialogTag, result: result);
  }
}