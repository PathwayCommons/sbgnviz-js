/*
 * Common utilities for elements includes both general utilities and sbgn specific utilities
 */
//var jQuery = $ = libs.jQuery;

module.exports = function () {
    var cy;
    var parsedDataMap;
    var visibleDataMapByExp;
    // var groupedGenomicDataCount;
    var groupedDataMap;
    var DEFAULT_VISIBLE_GENOMIC_DATA_COUNT = 3;
    // var MAX_VISIBLE_GENOMIC_DATA_COUNT = 6;
    // var observers;
    function experimentalDataOverlay (param) {
      // Init
      console.log("in init");
      cy = param.sbgnCyInstance.getCy();
      parsedDataMap = {};
      visibleDataMapByExp = {};
      // groupedGenomicDataCount = 0;
      groupedDataMap = {};
      // observers = [];
    }
    //functionalities for data processing
    experimentalDataOverlay.clearAllData = function(){
      parsedDataMap = {};
      visibleDataMapByExp = {};
      groupedDataMap = {};
    }
    // experimentalDataOverlay.getEmptyGroupID = function() {
    //   const oldCount = groupedGenomicDataCount
    //   groupedGenomicDataCount++
    //   return oldCount
    // }
  
    // experimentalDataOverlay.addGenomicDataLocally= function(data, groupID) {
    //   this.parseData(data, groupID)
    //   this.showData()
    // }
  
    // experimentalDataOverlay.preparePortalGenomicDataShareDB = function(genomicData) {
    //   const geneMap = {}
    //   const visMap = {}
  
    //   for (const cancerKey in genomicData) {
    //     for (const geneSymbol in genomicData[cancerKey]) {
    //       geneMap[geneSymbol] = {}
    //       geneMap[geneSymbol][cancerKey] = genomicData[cancerKey][geneSymbol]
    //     }
  
    //     visMap[cancerKey] = true
    //   }
  
    //   return {
    //     genomicDataMap: geneMap,
    //     visibilityMap: visMap
    //   }
    // }
  
    // experimentalDataOverlay.addGenomicData= function(data) {
    //   genomicDataMap = data
    // }
  
    // experimentalDataOverlay.removeGenomicVisData= function() {
    //   visibleGenomicDataMapByType = {}
    // }
  
    // experimentalDataOverlay.addGenomicDataWithGeneSymbol= function(geneSymbol, data) {
    //   genomicDataMap[geneSymbol] = data
    // }
  
    // experimentalDataOverlay.addGenomicGroupData= function(groupID, data) {
    //   groupedGenomicDataMap[groupID] = data
    // }
  
    // experimentalDataOverlay.addPortalGenomicData= function(data, groupID) {
    //   for (const cancerStudy of Object.keys(data)) {
    //     visibleGenomicDataMapByType[cancerStudy] = true
  
    //     // Group current cancer study according to the groupID
    //     if (groupedGenomicDataMap[groupID] === undefined) {
    //       groupedGenomicDataMap[groupID] = []
    //     }
  
    //     groupedGenomicDataMap[groupID].push(cancerStudy)
  
    //     var cancerData = data[cancerStudy]
  
    //     for (const geneSymbol of Object.keys(cancerData)) {
    //       if (genomicDataMap[geneSymbol] === undefined)
    //         genomicDataMap[geneSymbol] = {}
  
    //       genomicDataMap[geneSymbol][cancerStudy] = data[cancerStudy][
    //         geneSymbol
    //       ].toFixed(2)
    //     }
    //   }
  
    //   this.showGenomicData()
    //   this.notifyObservers()
    // }
    
    // experimentalDataOverlay.removeGenomicDataWithGeneSymbol = function(geneSymbol) {
    //   genomicDataMap[geneSymbol] = {}
    // }
    // experimentalDataOverlay. addGenomicVisData = function(key, data) {
    //   visibleGenomicDataMapByType[key] = data
    // }
    // experimentalDataOverlay.prepareGenomicDataShareDB = function(genomicData) {
    //   const genomicDataMap = {}
    //   const cancerTypes = []
    //   const visibleGenomicDataMapByType = {}
  
    //   // By lines
    //   const lines = genomicData.split('\n')
    //   // First line is meta data !
    //   const metaLineColumns = lines[0].split('\t')
  
    //   // Parse cancer types
    //   for (let i = 1; i < metaLineColumns.length; i++) {
    //     cancerTypes.push(metaLineColumns[i])
    //     // Update initially visible genomic data boxes !
    //     if (i - 1 < DEFAULT_VISIBLE_GENOMIC_DATA_COUNT) {
    //       visibleGenomicDataMapByType[cancerTypes[i - 1]] = true
    //     } else {
    //       visibleGenomicDataMapByType[cancerTypes[i - 1]] = false
    //     }
    //   }
  
    //   // parse genomic data
    //   for (let i = 1; i < lines.length; i++) {
    //     // EOF check
    //     if (lines[i].length === 0) {
    //       break
    //     }
  
    //     // Split each line by tab and parse genomic data content
    //     const lineContent = lines[i].split('\t')
    //     const geneSymbol = lineContent[0]
  
    //     // If current gene entry is not  in genomic data map create new hashmap entry
    //     if (!(geneSymbol in genomicDataMap)) {
    //       genomicDataMap[geneSymbol] = {}
    //     }
  
    //     // Add each entry of genomic data
    //     for (let j = 1; j < lineContent.length; j++) {
    //       genomicDataMap[geneSymbol][cancerTypes[j - 1]] = lineContent[j]
    //     }
    //   }
  
    //   const returnObj = {
    //     genomicDataMap: genomicDataMap,
    //     visibilityMap: visibleGenomicDataMapByType
    //   }
  
    //   return returnObj
    // }
  
    // experimentalDataOverlay.updateGenomicDataVisibility = function(_key, isVisible) {
    //   if (_key in visibleGenomicDataMapByType) {
    //     visibleGenomicDataMapByType[_key] = isVisible
    //   }
    // }
  
    experimentalDataOverlay.removeData = function(expName) {
      delete visibleDataMapByExp[expName]
      delete groupedDataMap[0][expName]
      for (let i in parsedDataMap) {
        for (let j in parsedDataMap[i]) {
          delete parsedDataMap[i][expName]
        }
      }
    }
    experimentalDataOverlay.hideData = function(expName) {
      visibleDataMapByExp[expName] = false
      this.showData()
    }
  
    experimentalDataOverlay.countVisibleDataByExp = function() {
      // Count the genomic data that will be displayed on nodes' body
      let dataBoxCount = 0
      for (let exp in visibleDataMapByExp) {
        if (visibleDataMapByExp[exp]) {
          dataBoxCount++
        }
      }
      return dataBoxCount
    }

    // experimentalDataOverlay.getRequiredWidth = function (dataBoxCount) {
    //   const term = dataBoxCount > 3 ? dataBoxCount - 3 : 0
    //   return 150 + term * 35
    // }
    
    //colors is an object like: colors[expName] = color
    experimentalDataOverlay.generateSVGForNode = function (ele) {
      const dataBoxCount = this.countVisibleDataByExp()
  
      // Experimental data overlay part !
     // const dataURI = 'data:image/svg+xml;utf8,'
      const svgNameSpace = 'http://www.w3.org/2000/svg'
      const nodeLabel = ele.data('label')
  
      // // If there is no genomic data for this node return !
      // if (!(nodeLabel in parsedDataMap)) {
      //   return dataURI
      // }
  
      const eleBBox = ele.boundingBox()
      const reqWidth = eleBBox.w
      const reqHeight = eleBBox.h
      const overlayRecBoxW = reqWidth
      const overlayRecBoxH = reqHeight
      const svg = document.createElementNS(svgNameSpace, 'svg')
      // It seems this should be set according to the node size !
      svg.setAttribute('width', reqWidth)
      svg.setAttribute('height', eleBBox.h)
      // This is important you need to include this to succesfully render in cytoscape.js!
      svg.setAttribute('xmlns', svgNameSpace)
  
      // Overlay Data Rect
      const overLayRectBBox = {
        w: overlayRecBoxW,
        h: overlayRecBoxH,
        x: 0,
        y: 0
      }
  
      const frequencyData = parsedDataMap[nodeLabel]
  
      let maxDataBoxCount = /*(genomicDataBoxCount > 3) ? 3:*/ dataBoxCount
      let counter = 0
  
      for (let i in groupedDataMap) {
        for (let j in groupedDataMap[i]) {
          const experiment = groupedDataMap[i][j]
          if (!visibleDataMapByExp[experiment]) {
            continue
          }
  
          if (frequencyData[experiment] !== undefined) {
            dataRectangleGenerator(
              overLayRectBBox.x +
                (counter * overLayRectBBox.w) / maxDataBoxCount,
              overLayRectBBox.y,
              overLayRectBBox.w / maxDataBoxCount,
              overLayRectBBox.h,
              frequencyData[experiment],
              svg
            )
          } else {
            dataRectangleGenerator(
              overLayRectBBox.x +
                (counter * overLayRectBBox.w) / maxDataBoxCount,
              overLayRectBBox.y,
              overLayRectBBox.w / maxDataBoxCount,
              overLayRectBBox.h,
              null,
              svg
            )
          }
  
          counter++
        }
      }
  
      function dataRectangleGenerator(x, y, w, h, percent, parentSVG) {
        let colorString = ''
        if (percent) {
          const isNegativePercent = percent < 0
          let _percent = Math.abs(percent)
          // Handle special cases here !
          _percent = _percent < 0.5 ? 2 : _percent
          _percent = _percent === 1 ? 2 : _percent
          // Here we are using non linear regression
          // Fitting points of (0,0), (25,140), (50,220), (100, 255)
          const percentColor = 255 - (-7.118 + 53.9765 * Math.log(_percent))
  
          if (percent === 0) {
            colorString = 'rgb(255,255,255)'
          } else if (isNegativePercent) {
            colorString =
              'rgb(' +
              Math.round(percentColor) +
              ',' +
              Math.round(percentColor) +
              ',255)'
            percent = percent.substring(1)
          } else {
            colorString =
              'rgb(255,' +
              Math.round(percentColor) +
              ',' +
              Math.round(percentColor) +
              ')'
          }
          // Rectangle Part
          const overlayRect = document.createElementNS(svgNameSpace, 'rect')
          overlayRect.setAttribute('x', x)
          overlayRect.setAttribute('y', y)
          overlayRect.setAttribute('width', w)
          overlayRect.setAttribute('height', h)
          overlayRect.setAttribute(
            'style',
            'stroke-width:1;stroke:rgb(0,0,0);opacity:1;fill:' + colorString + ';'
          )
  
          parentSVG.appendChild(overlayRect)
        } else {
          colorString = 'rgb(210,210,210)'
  
          // Rectangle Part
          const overlayRect = document.createElementNS(svgNameSpace, 'rect')
          overlayRect.setAttribute('x', x)
          overlayRect.setAttribute('y', y)
          overlayRect.setAttribute('width', w)
          overlayRect.setAttribute('height', h)
          overlayRect.setAttribute(
            'style',
            'stroke-width:1;stroke:rgb(0,0,0);opacity:1;fill:' + colorString + ';'
          )
  
          parentSVG.appendChild(overlayRect)
        }
      }
  
      return svg
    }

    experimentalDataOverlay.showData = function() {
      const self = this
      console.log('Inside NEW22 showGenomicData')
      cy.nodes().forEach(function(node) { 
        const nodeLabel = node.data('label')
        var imageURI = 'data:image/svg+xml;utf8,'
        //console.log(svgg)
        if(nodeLabel in parsedDataMap){
          imageURI = imageURI + encodeURIComponent(self.generateSVGForNode(node).outerHTML)
          node.data('background-image', imageURI),
          node.data('background-position-x', '100%');
          node.data('background-position-y', '100%');
          node.data('background-width', '100%');
          node.data('background-height', '100%');
          node.data('background-fit', 'contain');
          node.data('background-image-opacity', '1');
        }
        else{
          node.data('background-image',imageURI);
        }
      })

    }
    // experimentalDataOverlay.showGenomicData = function() {
    //   const self = this
  
    //   const dataBoxCount = this.countVisibleDataByEle()
  
    //    if (dataBoxCount < 1) {
    //     // Hide all genomic data and return
    //     this.hideGenomicData()
    //     return
    //    }
  
    //   console.log('Inside showGenomicData')
    //   console.log(cy)
  
    //   cy
    //     .style()
    //     .selector("node")
    //     // It used to change the width of nodes only locally
    //     // .style('width', ele => {
    //     //   return this.getRequiredWidth(dataBoxCount)
    //     // })
    //     // .style('text-margin-y', function(ele) {
    //     //   const nodeLabel = ele.data('label')
    //     //   // If there is no genomic data for this node return !
    //     //   if (!(nodeLabel in parsedDataMap)) {
    //     //     return 0
    //     //   }
    //     //   // Else shift label in Y axis
    //     //   return -15
    //     // })
    //     .style('background-image', function(ele) {
    //       const nodeLabel = ele.data('label')
    //       //const x = encodeURIComponent(self.generateSVGForNode(ele).outerHTML)
    //       //console.log(nodeLabel)
    //       //console.log(self.generateSVGForNode(ele).outerHTML)
    //       // if (x === 'undefined') {
    //       //   return 'none'
    //       // }
    //       if(nodeLabel in parsedDataMap){
    //         return 'image/svg+xml;utf8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20style%3D%22fill%3Anone%3Bstroke%3Ablack%3Bstroke-width%3A0%3B%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20style%3D%22fill%3A%23a9a9a9%22/%3E%20%3C/svg%3E'
    //       }
    //       else {
    //         return 'image/svg+xml;utf8'
    //       }
    //       // const dataURI = x
    //       // //console.log("DATAURI -------- " + dataURI)
    //       // return dataURI
    //     })
    //     //.style('background-fit', 'contain')
    //     .update()
    // }

    experimentalDataOverlay.parseData= function(data, groupID) {
      console.log("parse genomic data");
      parsedDataMap = parsedDataMap || {}
      visibleDataMapByExp = visibleDataMapByExp || {}
      groupedDataMap = groupedDataMap || {}
      const experiments = [];
  
      // By lines
      const lines = data.split('\n')
      // First line is meta data !
      const metaLineColumns = lines[0].split('\t')
  
      // Parse experiment types
      for (let i = 1; i < metaLineColumns.length; i++) {
        experiments.push(metaLineColumns[i])
        // Update initially visible genomic data boxes !
        if (i - 1 < DEFAULT_VISIBLE_GENOMIC_DATA_COUNT) {
          visibleDataMapByExp[experiments[i - 1]] = true
        } else {
          visibleDataMapByExp[experiments[i - 1]] = false
        }
  
        if (groupedDataMap[groupID] === undefined) {
          groupedDataMap[groupID] = []
        }
        groupedDataMap[groupID].push(experiments[i - 1])
      }
      console.log("first for out");
      // parse genomic data
      for (let i = 1; i < lines.length; i++) {
        // EOF check
        if (lines[i].length === 0) {
          break
        }
  
        // Split each line by tab and parse genomic data content
        const lineContent = lines[i].split('\t')
        const eleSymbol = lineContent[0]
  
        // If current gene entry is not  in genomic data map create new map
        if (!(eleSymbol in parsedDataMap)) {
          parsedDataMap[eleSymbol] = {}
        }
  
        // Add each entry of genomic data
        for (let j = 1; j < lineContent.length; j++) {
          parsedDataMap[eleSymbol][experiments[j - 1]] = lineContent[j]
        }
      }
    }
  
    // Simple observer-observable pattern for views!!!!!
    // experimentalDataOverlay.registerObserver = function(observer) {
    //   observers.push(observer)
    // }
  
    // experimentalDataOverlay.notifyObservers= function() {
    //   for (const observer of observers) {
    //     observer.notify()
    //   }
    // }

    return experimentalDataOverlay;
}