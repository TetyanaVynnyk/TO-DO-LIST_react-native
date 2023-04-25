import React, {useState} from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StatusBar,
  Appearance,
  Pressable,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Modal from "react-native-modal";

const data = [
  { id: 1, txt: "React Native", isChecked: false },
  { id: 2, txt: "Javascript", isChecked: false },
  { id: 3, txt: "Laravel", isChecked: false },
  { id: 4, txt: "PHP", isChecked: false },
  { id: 5, txt: "jQuery", isChecked: false },
  { id: 6, txt: "Boostrap", isChecked: false },
  { id: 7, txt: "HTML", isChecked: false },
];

export default function App() {
  StatusBar.setBarStyle("light-content", true);

  const [products, setProducts] = useState(data);
  const [isModalVisible, setModalVisible] = useState(false);

    
  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  let nonSelected = products.filter((product) => !product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        horizontal={false}
        data={renderData}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <Pressable onPress={() => handleChange(item.id)}>
                  <MaterialCommunityIcons
                    name={
                      item.isChecked
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={24}
                    color="#000"
                  />
                </Pressable>
                <Text>{item.txt}</Text>
              </View>
            </View>
          </View>
        )}
      />
    );
  };
  
  const ModalTester = () => {
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
      <View style={{ flex: 1 }}>
        <Button title="Finish" onPress={toggleModal} />
        {nonSelected.length === 0 && (
          <Modal isVisible={isModalVisible} propagateSwipe style={styles.modal}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modaltext}>You have done all tasks</Text>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </Modal>
        )}
        {nonSelected.length !== 0 && (
          <Modal isVisible={isModalVisible} propagateSwipe style={styles.modall}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modaltext}>You have not done yet </Text>
              <View style={{ flex: 1 }}>{renderFlatList(nonSelected)}</View>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </Modal>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Todays Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            <View style={styles.container}>
              <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
              <ModalTester />
              <StatusBar />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

//Colors for the themes
const darkMode = {
  backgroundColor: "#1D3557",
  primaryColor: "#F1FAEE",
  secondaryColor: "#A8DADC",
  accentColor: "#E63946",
};

const lightMode = {
  backgroundColor: "#F1FAEE",
  primaryColor: "#457B9D",
  secondaryColor: "#1D3557",
  accentColor: "#E63946",
};

// Find out what the current theme is using appearance
///
let theme = Appearance.getColorScheme();

if (theme === "dark") {
  currentTheme = darkMode;
  console.log("Dark mode is on");
} else {
  currentTheme = lightMode;
  console.log("Light mode is on");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentTheme.backgroundColor,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    color: theme.primaryColor,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "80%",
    height: 60,
    backgroundColor: currentTheme.primaryColor,
    borderRadius: 60,
    borderColor: currentTheme.secondaryColor,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: currentTheme.accentColor,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },

  addText: {
    fontSize: 30,
    color: currentTheme.primaryColor,
    fontWeight: "bold",
    alignSelf: "center",
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },

  modal: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    padding: 35,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  modall: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    padding: 35,
    borderRadius: 4,
    flex: 1,
  },

  modaltext: {
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
});
