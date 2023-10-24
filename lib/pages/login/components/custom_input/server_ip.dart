import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import '../../../../config/app_config.dart';
import 'custom_input.dart';
import '../../../../utils/color/color_hex.dart';
import '../../../../utils/index.dart'
    show SpUtil, checkTextEmpty, isTextEmpty, Tips;

const double _kItemExtent = 32.0;
const List<String> _fruitNames = <String>[
  'http',
  'https',
];

class ServerIpExample extends StatefulWidget {
  const ServerIpExample({super.key});

  @override
  State<ServerIpExample> createState() => ServerIpState();
}

class ServerIpState extends State<ServerIpExample> {
  int _selectedFruit = 0;
  final _ipController = TextEditingController();
  final _portController = TextEditingController();

  @override
  void initState() {
    super.initState();
    setDefaultValue();
  }

  /**
   * 获取当前配置的ip
   */
  String getServerIp() {
    var currentVal = _fruitNames[_selectedFruit];
    var ip = _ipController.text;
    var port = _portController.text;
    if (!checkTextEmpty(ip) && !checkTextEmpty(port)) {
      return '$currentVal://$ip:$port';
    } else if (!checkTextEmpty(ip)) {
      return '$currentVal://$ip';
    }
    return '';
  }

  void setServerIp() {
    SpUtil.setData('serverIp', getServerIp());
  }

  void setDefaultValue() async {
    final _serverIp = await AppConfig.serverIp();
    if (!isTextEmpty(_serverIp)) {
      final _serverIps = _serverIp.toString()?.split('://');
      final protocol = _serverIps?[0];
      setState(() {
        _selectedFruit = protocol == 'http' ? 0 : 1;
      });
      final ip = _serverIps?[1]?.split(':')?[0];
      _ipController.text = ip ?? '';
      final port = _serverIps?[1]?.split(':')?[1];
      _portController.text = port ?? '';
    } else {
      Tips.info('请输入服务器配置');
    }
  }

  // This shows a CupertinoModalPopup with a reasonable fixed height which hosts CupertinoPicker.
  void _showDialog(Widget child) {
    showCupertinoModalPopup<void>(
        context: context,
        builder: (BuildContext context) => Container(
              height: 216,
              padding: const EdgeInsets.only(top: 6.0),
              // The Bottom margin is provided to align the popup above the system navigation bar.
              margin: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              // Provide a background color for the popup.
              color: CupertinoColors.systemBackground.resolveFrom(context),
              // Use a SafeArea widget to avoid system overlaps.
              child: SafeArea(
                top: false,
                child: child,
              ),
            ));
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: DefaultTextStyle(
        style: TextStyle(
          color: CupertinoColors.label.resolveFrom(context),
          fontSize: 22.0,
        ),
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                  flex: 1,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      shape: BoxShape.rectangle,
                      color: Color(0x00FFFFFF),
                      border: Border.all(
                        color: HexColor('#D8E0F0'), //
                        width: 1,
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CupertinoButton(
                      padding: const EdgeInsets.only(top: 12.0, bottom: 12.0),
                      // Display a CupertinoPicker with list of fruits.
                      onPressed: () => _showDialog(
                        CupertinoPicker(
                          magnification: 1.22,
                          squeeze: 1.2,
                          useMagnifier: true,
                          itemExtent: _kItemExtent,
                          // This is called when selected item is changed.
                          onSelectedItemChanged: (int selectedItem) {
                            setState(() {
                              _selectedFruit = selectedItem;
                              setServerIp();
                            });
                          },
                          children: List<Widget>.generate(_fruitNames.length,
                              (int index) {
                            return Center(
                              child: Text(
                                _fruitNames[index],
                              ),
                            );
                          }),
                        ),
                      ),
                      // This displays the selected fruit name.
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            _fruitNames[_selectedFruit],
                            style: const TextStyle(
                              fontSize: 22.0,
                            ),
                          ),
                          Icon(CupertinoIcons.chevron_down)
                        ],
                      ),
                    ),
                  )),
              Expanded(
                flex: 2,
                child: CustomInput(
                    hintText: 'IP/域名',
                    controller: _ipController,
                    inputType: InputType.close,
                    onChanged: (v) {
                      setServerIp();
                    }),
              ),
              Expanded(
                flex: 1,
                child: CustomInput(
                  hintText: '端口',
                  inputType: InputType.close,
                  onChanged: (v) {
                    setServerIp();
                  },
                  controller: _portController,
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                    LengthLimitingTextInputFormatter(6),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
