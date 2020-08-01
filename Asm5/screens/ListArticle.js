import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Alert, RefreshControl } from 'react-native';
import ListArticleServer from '../server/Server';

const OpenURLButton = ({ url }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return(
    <TouchableOpacity
      style={styles.readMoreBtn}
      onPress={handlePress}
    >
      <Text style={{ color: "black" }}>Read more</Text>
    </TouchableOpacity>
  );
}
const ListArticalItems = (props) => {
  const url = props.item.url;
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.tiles}>{props.item.title}</Text>
      <Image
        source={{ uri: props.item.urlToImage }}
        style={styles.img}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Source:</Text>
        <Text style={styles.info}>{props.item.source.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Published:</Text>
        <Text style={styles.info}>{props.item.publishedAt}</Text>
      </View>
      <Text style={styles.description}>{props.item.description}</Text>
      <Text style={styles.content}>{props.item.content}</Text>
      <OpenURLButton 
        url={url}
      />
    </View>
  );
}

const ListArticle = () => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  refreshData = () => {
    setRefreshing(true);
    ListArticleServer()
      .then((data) => {
        setArticles(data);
        setRefreshing(false);
      })
      .catch((err) => {
        setArticles([]);
        console.log(err);
        setRefreshing(false);
      });
  }

  onRefresh = () => {
    refreshData();
    console.log("Loading");
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topTile}>Articles Count: {articles.length}</Text>
      <FlatList
        data={articles}
        renderItem={({ item, index }) => {
          return (
            <ListArticalItems
              item={item}
              index={index}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  tiles: {
    fontSize: 17,
    fontWeight: "bold"
  },
  img: {
    flex: 1,
    width: 350,
    height: 250,
    resizeMode: "contain",
    margin: 5
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5
  },
  row: {
    flexDirection: 'row',
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  description: {
    padding: 5,
    fontStyle: "italic"
  },
  content: {
    padding: 5
  },
  readMoreBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 40,
    padding: 10,
    margin: 10
  },
  topTile: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20
  }
});

export default ListArticle;