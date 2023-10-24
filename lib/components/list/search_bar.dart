// import 'package:flutter/material.dart';
// import 'package:flutter_screenutil/flutter_screenutil.dart';
// // import 'package:material_floating_search_bar/material_floating_search_bar.dart';
//
// import '../../utils/color/color_hex.dart';
// import '../basic_safe_area/basic_compatibility.dart';
// import 'search_bar.p.dart';
//
// ///  Created by wangxiangyu on 2023/4/28.
// class SearchBar extends StatefulWidget {
//   SearchBar(
//       {Key? key,
//       required this.child,
//       this.onPressed,
//       this.onReset,
//       this.searchBarStore,
//       this.changeParams})
//       : super(key: key);
//
//   final Widget? child;
//   final SearchBarStore? searchBarStore;
//   final changeParams;
//
//   /// 点击确定事件
//   final Map<String, dynamic> Function()? onPressed;
//
//   /// 点击重置事件
//   final void Function()? onReset;
//
//   @override
//   _SearchBarState createState() => _SearchBarState();
// }
//
// class _SearchBarState extends State<SearchBar> {
//   // FloatingSearchBarController _controller = new FloatingSearchBarController();
//   late String paramsStr = '';
//   FocusNode _focusNode = FocusNode();
//
//   @override // AbsorbPointer
//   Widget build(BuildContext context) {
//     return BasicCompatibility(
//       changeParams: widget.changeParams,
//       child: FloatingSearchBar(
//         controller: _controller,
//         hint: '搜索...',
//         title: paramsStr.isNotEmpty ? Text(paramsStr) : null,
//         // 文本框显示内容
//         scrollPadding:
//             EdgeInsets.only(top: 8, bottom: ScreenUtil().setHeight(56)),
//         transitionDuration: Duration(milliseconds: 200),
//         transitionCurve: Curves.easeInOut,
//         physics: BouncingScrollPhysics(),
//         axisAlignment: 0.0,
//         openAxisAlignment: 0.0,
//         elevation: 0.0,
//         showCursor: false,
//         width: MediaQuery.of(context).size.width,
//         height: ScreenUtil().setHeight(90),
//         debounceDelay: Duration(milliseconds: 200),
//         onQueryChanged: (query) {
//           _controller.clear();
//           // do something when query changed
//         },
//         // leadingActions: [
//         //   FloatingSearchBarAction(
//         //     showIfOpened: true,
//         //     child: CircularButton(
//         //       icon: const Icon(Icons.place),
//         //       onPressed: () {},
//         //     ),
//         //   ),
//         // ],
//         // actions: [
//         //   FloatingSearchBarAction(
//         //     showIfOpened: false,
//         //     child: CircularButton(
//         //       icon: const Icon(Icons.place),
//         //       onPressed: () {},
//         //     ),
//         //   ),
//         //   FloatingSearchBarAction.searchToClear(
//         //     showIfClosed: false,
//         //   ),
//         // ],
//         builder: (context, transition) {
//           return Container(
//               color: hexToColor('#ffffff'),
//               padding: EdgeInsets.only(left: 16.w, right: 16.w, bottom: 24.h),
//               child: SingleChildScrollView(
//                 child: Column(
//                   children: [
//                     widget.child ?? Container(),
//                     Center(
//                       child: Container(
//                           width: double.infinity,
//                           padding: const EdgeInsets.only(top: 16),
//                           child: Row(
//                             mainAxisAlignment: MainAxisAlignment.spaceAround,
//                             children: [
//                               Expanded(
//                                 child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(
//                                       elevation: 0.0,
//                                       primary: hexToColor('#F4F7FA'), // 按钮背景色
//                                       onPrimary: Colors.black, // 按钮上文本的颜色
//                                       minimumSize: Size(100, 50)),
//                                   onPressed: () {
//                                     widget.onReset!();
//                                     setState(() {
//                                       paramsStr = '';
//                                     });
//                                   },
//                                   child: Text('重置'),
//                                 ),
//                               ),
//                               SizedBox(width: 20),
//                               Expanded(
//                                 child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(
//                                       elevation: 0.0,
//                                       minimumSize: Size(100, 50)),
//                                   onPressed: () {
//                                     final _formParams = widget.onPressed!();
//                                     _controller.close();
//                                     setState(() {
//                                       paramsStr = _formParams['paramsStr'];
//                                     });
//                                   },
//                                   child: Text('确定'),
//                                 ),
//                               )
//                             ],
//                           )),
//                     ),
//                   ],
//                 ),
//               ));
//         },
//       ),
//     );
//   }
// }
