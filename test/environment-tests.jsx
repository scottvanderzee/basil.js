#include "../basil.js";
#include "../lib/basil.test.js";

b.test('EnvironmentTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testDocCreatesDocument: function(b) {
    var doc = b.doc();
        
    assert(doc instanceof Document);
    assert(app.documents.length === 1);
  },

  testDocSetsDocumentByInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc(doc);
        
    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNonDocumentInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc({});

    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNotExistingDocumentThrowsError: function(b) {
    var doc = app.documents.add();
    doc.close(SaveOptions.no);

    try {
      b.doc(doc);
      assert(false);
    } catch (expected) {}
  },

  testPageSetsPageByInstance: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(secondPage);
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageSetsPageByIndex: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(2);
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageWithNotExistingPageIndexThrowsError: function(b) {
    b.doc(app.documents.add());

    try {
      b.page(500);
      assert(false);
    } catch (expected) {}
  },

  testLayerSetsLayerByInstance: function(b) {
    var doc = app.documents.add();
    var addedLayer = doc.layers.add({name: 'foo'});
    b.doc(doc);

    var layer = b.layer(addedLayer);
    
    assert(layer instanceof Layer);
    assert(addedLayer == layer);
  },

  testLayerSetsLayerByName: function(b) {
    var doc = app.documents.add();
    var addedLayer = doc.layers.add({name: 'foo'});
    b.doc(doc);

    var layer = b.layer('foo');
    
    assert(layer instanceof Layer);
    assert(addedLayer == layer);
  },

  testLayerWithNotExistingLayerNameAddsLayer: function(b) {
    var doc = app.documents.add();
    b.doc(doc);

    var layer = b.layer('foo');
    
    assert(layer instanceof Layer);
    assert(doc.layers.item('foo') == layer);
  },

  testClear: function(b) {

    b.doc();
    b.layer("fancy");
    b.ellipse(20,20,20,20);
    assert(b.doc().allPageItems.length === 1);
    b.clear(b.layer("fancy"));    
    assert(b.doc().allPageItems.length === 0);    
    b.ellipse(20,20,20,20);    
    assert(b.doc().allPageItems.length === 1);    
    b.clear(b.page());   
    assert(b.doc().allPageItems.length === 0);    
    b.ellipse(20,20,20,20);
    assert(b.doc().allPageItems.length === 1);    
    b.clear(b.doc());
    assert(b.doc().allPageItems.length === 0);    

//    b.clearSwatches();
   
  },

  testForEachItems: function(b) {

    b.doc();
    b.page();
    b.layer("fancy");

    b.ellipse(20,20,20,20);
    b.ellipse(40,70,20,20);
    
    var result1 = result2 = result3 = 0;
    
    // process all items on a layer
    b.items( b.layer("fancy"), function( item, n ) {
                result1++;
        }
    );
    
    // process all items on a page
    b.items( b.page(), function( item, n ) {
                result2++;
        }
    );
    
    // process all items in document
    b.items( b.doc(), function( item, n ) {
                result3++;
        }
    );
    
    assert( result1 === 2 && result2 === 2 && result3 === 2 );
  }

});

// print collected test results
b.test.result();

