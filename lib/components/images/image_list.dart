import 'package:flutter/material.dart';
import 'package:smart_iot_app/components/images/image_auth.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import 'image_list_view.dart';

///  Created by pgli on 2023/4/23.
class ImageList extends StatefulWidget {
  ImageList({Key? key, this.list: const []}) : super(key: key);

  final List list;

  @override
  _ImageListState createState() => _ImageListState();
}

class _ImageListState extends State<ImageList> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: GridView.builder(
        shrinkWrap: true,
        //解决 listview 嵌套报错
        physics: NeverScrollableScrollPhysics(),
        //禁用滑动事件
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            //横轴元素个数
            crossAxisCount: 3,
            //纵轴间距
            mainAxisSpacing: 10.0,
            //横轴间距
            crossAxisSpacing: 10.0,
            //子组件宽高长度比例
            childAspectRatio: 1.0),
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              _jumpToGallery(index, widget.list);
            },
            child: ImageAuth(imageUrl: widget.list[index]['image'], size: 24),
          );
        },
        itemCount: widget.list.length,
      ),
    );
  }

  //jump to photo gallery
  void _jumpToGallery(index, list) async {
    final _image = await authImage('');
    pushNewScreenWithRouteSettings(
      context,
      screen: ImageListView(
        index: index,
        list: list,
      ),
      settings: RouteSettings(name: '/image_list'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    );
  }
}
