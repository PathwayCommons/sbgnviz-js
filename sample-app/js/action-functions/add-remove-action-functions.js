var addRemoveActionFunctions = {
  deleteElesSimple: function (param) {
    return sbgnElementUtilities.deleteElesSimple(param.eles);
  },
  restoreEles: function (eles) {
    var param = {};
    param.eles = sbgnElementUtilities.restoreEles(eles);
    return param;
  },
  deleteElesSmart: function (param) {
    if (param.firstTime) {
      return sbgnElementUtilities.deleteElesSmart(param.eles);
    }
    return sbgnElementUtilities.removeElesSimply(param.eles);
  },
};