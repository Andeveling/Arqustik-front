import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer"
import { useState, useEffect } from "react"

/* Font.register({family: "Inter"}) */

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
  },
})

const PDF = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Text wrap={false} style={{ alignSelf: "flex-end" }}>
            Ventana VentanaVentanaVentanaVentanaVentanaVentana
          </Text>
        </View>
      </Page>
    </Document>
  )
}

const PDFView = () => {
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])
  return (
    <PDFViewer>
      <PDF />
    </PDFViewer>
  )
}

export default PDFView
