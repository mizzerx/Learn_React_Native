import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import TODOS from '../data/data';
import { createStackNavigator } from '@react-navigation/stack';

const ListToDos = (props) => {
  const BackGround = {
    backgroundColor: props.item.status === "Done" ? "blue" : "green"
  }
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Detail", {
          id: props.item.id,
          status: props.item.status,
          body: props.item.body
        });

        props.item.status = props.item.status === "Active" ? "Done" : "Active";
        props.refreshList(props.item.id);
      }}
      onLongPress={() => {
        const prompt = `"${props.item.body}"`;
        Alert.alert(
          'Delete your todo?',
          prompt,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            { text: 'OK', onPress: () => props.onDelete(props.item.id) }
          ],
          { cancelable: true }
        );
      }}>
      <View>
        <View style={[styles.listItemsContainer, BackGround]}>
          <Text style={styles.textItems}>{props.index} : {props.item.body}</Text>
        </View>
        <View style={styles.emptyView}></View>
      </View>
    </TouchableOpacity>
  );
}

const AllScreenHome = ({ navigation }) => {
  let [todo, setTodo] = React.useState(TODOS);
  let [newStatus, setNewStatus] = React.useState("Active");
  let [newBody, setNewBody] = React.useState("");
  let [activeKey, setActiveKey] = React.useState(null);
  const refreshList = (Key) => {
    setActiveKey(Key);
  }
  const onDelete = (id) => {
    const newList = todo.filter(todo => todo.id !== id);
    setTodo(newList);
    refreshList(todo);
  }
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.TodoDes}>Todo List ({todo.length})</Text>
        <FlatList
          data={todo}
          renderItem={({ item, index }) => {
            return (
              <ListToDos
                item={item}
                index={index + 1}
                navigation={navigation}
                refreshList={refreshList}
                onDelete={onDelete}>

              </ListToDos>
            );
          }}
        >
        </FlatList>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              setNewBody(text);
            }}></TextInput>
          <TouchableOpacity
            style={styles.smBtn}
            onPress={() => {
              if (newBody === "") alert("There is no content to submit");
              else {
                let newData = {
                  id: todo.length + 1,
                  status: newStatus,
                  body: newBody
                }

                todo.push(newData);
                refreshList(newData.id);
              }
            }}>
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const AllScreenDetail = ({ route }) => {
  const { id } = route.params;
  const { status } = route.params;
  const { body } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>{id}: {status}</Text>
      <Text style={styles.detailTextBody}>{body}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const AllScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="ToDo List" component={AllScreenHome} />
      <Stack.Screen name="Detail" component={AllScreenDetail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 25
  },
  textItems: {
    color: "white",
    padding: 10,
    fontSize: 20
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  emptyView: {
    height: 20
  },
  TodoDes: {
    fontSize: 25,
    padding: 10
  },
  inputText: {
    color: "blue",
    margin: 10,
    width: 250,
    padding: 10,
    borderBottomWidth: 1
  },
  smBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 70
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  detailText: {
    padding: 20,
    fontSize: 30
  },
  detailTextBody: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default AllScreen;