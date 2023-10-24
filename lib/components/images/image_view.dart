import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';

import 'image_auth.dart';
import 'image_list_view.dart';

class ImageView extends StatefulWidget {
  final url;

  ImageView({required this.url});

  @override
  _ImageViewState createState() => _ImageViewState();
}

class _ImageViewState extends State<ImageView> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        pushNewScreenWithRouteSettings(
          context,
          screen: ImageListView(
            index: 0,
            list: [
              {'image': widget.url, 'key': '1'}
            ],
          ),
          settings: RouteSettings(name: '/image_list'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
      },
      child: Container(
        color: Colors.transparent,
        child: Center(
            child: ImageAuth(
          imageUrl: widget.url,
          size: 60,
        )),
      ),
    );
  }
}
