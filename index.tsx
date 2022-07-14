import * as React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import OptionsHeader from "../../components/OptionsHeader";
import actions from "../../components/StockOptionsActions/actionData";

import ScanIconButton from "../../../assets/scan_icon-High.png";
import EditIconButton from "../../../assets/icon_edit-High.png";
import GpsIcon from "../../../assets/GPS.png";
import BarCodeIcon from "../../../assets/Subtract.png";

const ArticlesDataSearchScreen = ({ navigation }: { navigation: any }) => {
  const DATA = actions;
  const [scrollContent, setScrollContent] = useState<any>([]);
  const [select, setSelect] = useState(DATA);
  const onPressItem = (item: any) => {
    let newArray = select.map((val) => {
      if (val.id === item.id) {
        return { ...val, selected: !val.selected };
      } else {
        return { ...val, selected: false };
      }
    });
    setSelect(newArray);
  };

  return (
    <>
      <OptionsHeader navigation={navigation} />
      <View style={styles.HeaderContainer}>
        <View style={styles.EditButtonView}>
          <TouchableOpacity>
            <Image source={EditIconButton} style={styles.HeaderButtons} />
          </TouchableOpacity>
        </View>
        <View style={styles.BarCodeButtonView}>
          <TouchableOpacity>
            <Image source={ScanIconButton} style={styles.HeaderButtons} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Container}>
        <View style={styles.ProductNameView}>
          <Text style={styles.BoldTextStyle}>NOME DO PRODUTO</Text>
        </View>
        <View style={styles.StockReference}>
          <View style={styles.ReferenceView}>
            <Image source={BarCodeIcon} style={styles.BarCodeStyle} />
            <Text style={styles.StockText}>REFERÊNCIA</Text>
          </View>
          <View style={styles.LocalizationView}>
            <Image source={GpsIcon} style={styles.GpsStyle} />
            <Text style={styles.StockText}>LOCALIZAÇÃO</Text>
          </View>
        </View>
        <View style={styles.StockLabelsView}>
          <View style={styles.firstColumInfos}>
            <Text style={styles.BoldText}>Stock</Text>
            <Text style={styles.BoldText}>Enc.Cli.</Text>
            <Text style={styles.BoldText}>Enc.For.</Text>
            <Text style={styles.BoldText}>Stk.Prev</Text>
          </View>
          <View style={styles.secondColumInfos}>
            <Text style={styles.BoldText}>00000</Text>
            <Text style={styles.BoldText}>00000</Text>
            <Text style={styles.BoldText}>00000</Text>
            <Text style={styles.BoldText}>00000</Text>
          </View>
        </View>
        <View style={styles.SelectMenuView}>
          {/* flatlist */}
          <FlatList
            data={select}
            horizontal
            style={styles.FlatlistStyle}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                key={item.id}
                  style={
                    item.selected
                      ? styles.OptionPressed
                      : styles.OptionContainer
                  }
                  onPress={() => {
                    () => onPressItem(item);
                    // console.log("Press", item.id);
                    // console.log("Press Stock", item?.stock);
                    if (item.stock !== undefined) {
                      setScrollContent(item.stock);
                    } else {
                      setScrollContent([]);
                    }
                  }}
                >
                  <Text style={styles.ThinText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.StockFlatlistView}>
          {/* scroolview */}
          {scrollContent.length === 0 ? (
          <>
            <View>
              <Text style={styles.ScrollViewText}>Não há artigos disponiveis</Text>
            </View>
          </>
        ) : ( 
          <>
            <ScrollView>
              {scrollContent.map((item: any, index: number) => {
                // console.log(item);
                return (
                  <View style={styles.scrollviewStyle} key={index}>
                    <Text style={styles.ScrollViewText}>
                      {item.productName}
                    </Text>
                    <Text style={styles.ScrollViewText}>
                      {item.quantity}
                      </Text>
                    <Text style={styles.ScrollViewText}>
                      {item.cor}
                      </Text>
                    <Text style={styles.ScrollViewText}>
                      {item.tam}
                      </Text>
                    <Text style={styles.ScrollViewText}>
                      {item.serialnumberOne}
                    </Text>
                    <Text style={styles.ScrollViewText}>
                      {item.serialnumberTwo}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </>
           ) 
           } 
        </View>
      </View>
    </>
  );
};

export default ArticlesDataSearchScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 2,
    width: "100%",
  },
  HeaderContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "transparent",
    flex: 0.1,
    width: "25%",
    alignSelf: "flex-end",
    bottom: 45,
    right: "1%",
    justifyContent: "flex-end",
  },
  ProductNameView: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    flex: 0.1,
    justifyContent: "center",
  },
  StockReference: {
    borderColor: "transparent",
    borderWidth: 2,
    width: "100%",
    flex: 0.1,
    flexDirection: "row",
  },
  ReferenceView: {
    borderColor: "transparent",
    flexDirection: "row",
    borderWidth: 2,
    width: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  LocalizationView: {
    borderColor: "transparent",
    borderWidth: 2,
    width: "50%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  EditButtonView: {
    borderColor: "transparent",
    borderWidth: 2,
    height: 60,
  },
  BarCodeButtonView: {
    borderColor: "transparent",
    borderWidth: 2,
    height: 60,
  },
  StockLabelsView: {
    borderColor: "#E5E5E5",
    borderTopWidth: 1,
    flex: 0.2,
    width: "100%",
    justifyContent: "center",
  },
  SelectMenuView: {
    flex: 0.1,
    borderColor:"#E5E5E5",
    borderTopWidth: 1,
    justifyContent: "center"
  },
  StockFlatlistView: {
    width: "100%",
    backgroundColor: "#2854C6",
    flex: 0.6,
  },
  BoldTextStyle: {
    fontWeight: "800",
    fontSize: 20,
    color: "#4F5B65",
    left: 10,
    flexDirection: "row",
  },
  HeaderButtons: {
    width: 50,
    height: 50,
  },
  StockText: {
    fontWeight: "800",
    fontSize: 18,
    color: "#4F5B65",
    justifyContent: "center",
  },
  GpsStyle: {
    width: 25,
    height: 30,
  },
  BarCodeStyle: {
    width: 35,
    height: 20,
  },
  firstColumInfos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  secondColumInfos: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  BoldText: {
    fontWeight: "800",
    fontSize: 16,
    color: "#4F5B65",
  },
  ItemFlatlistStyle: {
    width: "95%",
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    margin: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  FlatlistStyle: {
    maxHeight: 40,
  },
  FlatlistTextStyle: {
    fontWeight: "800",
    fontSize: 20,
    color: "#4F5B65",
  },
  flatListStyle: {
    width: "100%",
    borderRadius: 30,
  },
  SafeAreaViewStyle: {
    width: "100%",
    borderWidth: 2,
    borderColor: "transparent",
    flex: 1,
  },
  FlatListView: {
    width: "100%",
    flex: 1,
  },
  ContainerFlatlist: {
    flexDirection: "row",
    backgroundColor: "#2854C6",
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    marginHorizontal: 1,
  },
  ThinText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#ffff",
  },
  OptionsOnPress: {
    flexDirection: "row",
    width: "100%",
  },
  OptionPressed: {
    flexDirection: "row",
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    marginHorizontal: 1,
  },
  OptionContainer: {
    flexDirection: "row",
    backgroundColor: "#2854C6",
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    marginHorizontal: 1,
  },
  scrollviewStyle: {
    width: "95%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
  },
  ScrollViewText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#4F5B65",
  },
});
