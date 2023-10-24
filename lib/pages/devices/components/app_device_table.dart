import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/pages/devices/device_home/provider/device_home.p.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import '../../../components/table/simple_table.dart';
import '../../../utils/color/color_hex.dart';
import '../device_list/device_list.dart';

GlobalKey<SimpleTableState> tableKey = GlobalKey();

class AppDeviceTable extends StatefulWidget {
  const AppDeviceTable({super.key, this.homeStore, this.refresh});

  final Device_homeStore? homeStore;
  final void Function(dynamic value)? refresh;

  @override
  AppDeviceTableState createState() => AppDeviceTableState();
}

class AppDeviceTableState extends State<AppDeviceTable> {
  late List<dynamic> _dataSource = [];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  @override
  void initState() {
    super.initState();
    widget.homeStore?.addListener(() {
      _dataSource = widget.homeStore?.appDeviceStatBeanList ?? [];
      tableKey.currentState?.getData();
    });
  }

  @override
  void dispose() {
    super.dispose();
    widget.homeStore?.dispose();
  }

  Future<List<dynamic>> _request() async {
    return _dataSource;
  }

  _onRowTap(item) {
    pushNewScreenWithRouteSettings(
      context,
      screen: DeviceList(params: {'appId': item['appId']}),
      settings: RouteSettings(name: '/DeviceList'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    ).then(widget?.refresh ?? (value) {});
  }

  @override
  Widget build(BuildContext context) {
    return SimpleTable(
      key: tableKey,
      request: _request,
      minWidth: MediaQuery.of(context).size.width,
      columns: [
        DataColumn2(
          fixedWidth: 60,
          label: Text(
            '名称',
            style: TextStyle(fontSize: 28.sp),
          ),
          size: ColumnSize.S,
        ),
        DataColumn2(
          label: Text(
            '设备总数',
            style: TextStyle(fontSize: 28.sp),
          ),
          fixedWidth: 90,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('deviceCount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('离线数',
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp)),
          fixedWidth: 80,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('offlineCount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('在线率 (%)',
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp)),
          numeric: true,
          fixedWidth: 95,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('onlineRate', columnIndex, ascending),
        ),
      ],
      renderRows: (item) {
        return DataRow(cells: [
          DataCell(onTap: () {
            _onRowTap(item);
          }, Text('${item['appName']}', style: TextStyle(fontSize: 28.sp))),
          DataCell(Text('${item['deviceCount']}',
              style: TextStyle(fontSize: 28.sp))),
          DataCell(Text('${item['offlineCount']}',
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp))),
          DataCell(Text(
              '${((item['onlineRate'] ?? 0) * 100)?.toStringAsFixed(2)}',
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp))),
        ]);
      },
    );
  }
}
