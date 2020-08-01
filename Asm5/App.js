import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import ListArticle from './screens/ListArticle';
import ListArticleServer from './server/Server';

const App = () => {
  const [loading, setLoading] = useState(true);

  const loadingData = () => {
    ListArticleServer();
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color="green"
          size="large"
          loading={loading}
        />
      </View>
    );
  }

  return(
    <ListArticle />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;