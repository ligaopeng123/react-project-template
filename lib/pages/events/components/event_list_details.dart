import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import '../../../components/card/card_base.dart';
import '../../../components/images/image_list.dart';
import '../../../components/images/image_view.dart';
import '../../../components/text/descriptions_item.dart';
import 'event_handle_status_tags.dart';
import 'event_level_tags.dart';

///  Created by pgli on 2023/4/23.
class EventListDetail extends StatefulWidget {
  EventListDetail({Key? key, this.detailsData}) : super(key: key);

  final Map<String, dynamic>? detailsData;

  @override
  _EventListDetailState createState() => _EventListDetailState();
}

class _EventListDetailState extends State<EventListDetail> {
  @override
  Widget build(BuildContext context) {
    final item = widget.detailsData ?? {};
    final len = item['relationPictureList']?.length ?? 0;
    final imageList = item['relationPictureList'];
    List<dynamic> mapList = imageList.asMap().entries.map((entry) {
      int index = entry.key;
      String value = entry.value;
      return {'key': index.toString(), 'image': value.toString()};
    }).toList();

    return PageCard(
        title: AppBarTitle(title: '事件详情'),
        body: Column(
          children: [
            CardBase(
              title: item['deviceName'] ?? '',
              child: Wrap(
                children: [
                  DescriptionsItem(label: '类型', value: item['eventName']),
                  DescriptionsItem(
                      label: '状态',
                      value:
                          EventHandleStatusTags(status: item['handleStatus'])),
                  DescriptionsItem(
                      label: '等级',
                      value: EventLevelTags(
                        eventLevel: item['eventLevel'],
                      )),
                  DescriptionsItem(label: '时间', value: item['happenTime']),
                  DescriptionsItem(label: '区域', value: item['areaName']),
                  DescriptionsItem(
                      label: '内容',
                      value: Expanded(
                        child: Text(
                          item['content'] ?? '',
                          style: TextStyle(fontSize: 14),
                        ),
                      )),
                ],
              ),
            ),
            CardBase(
              title: item['eventName'],
              extra: EventLevelTags(
                eventLevel: item['eventLevel'],
              ),
              child: Container(
                  padding: EdgeInsets.only(top: 16.w),
                  child: SizedBox(
                    height: 300.0.w,
                    child: ImageView(url: item['eventPicture']),
                  )),
            ),
            CardBase(
              title: '联动抓图[$len]',
              child: Container(
                padding: EdgeInsets.only(top: 16.w),
                child: ImageList(list: mapList),
              ),
            )
          ],
        ));
  }
}
