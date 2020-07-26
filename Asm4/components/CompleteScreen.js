import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TODOS from '../data/data';

const ListToDos = (props) => {
  const BackGround = {
    backgroundColor: props.item.status === "Done" ? "blue" : "green"
  }
  return (
    <TouchableOpacity>
      <View>
        <View style={[styles.listItemsContainer, BackGround]}>
          <Text style={styles.textItems}>{props.index} : {props.item.body}</Text>
        </View>
        <View style={styles.emptyView}></View>
      </View>
    </TouchableOpacity>
  );
}

const ActiveScreen = () => {
  let completeList = [];
  for (i = 0; i < TODOS.length; i++) {
    if (TODOS[i].status === "Done") completeList.push(TODOS[i]);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={completeList}
        renderItem={({ item, index }) => {
          return (
            <ListToDos
              item={item}
              index={index + 1}
            //navigation={navigation}
            //refreshList={refreshList}
            //onDelete={onDelete}
            >

            </ListToDos>
          );
        }}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
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

export default ActiveScreen;