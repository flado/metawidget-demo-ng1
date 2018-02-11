  /**
   * app Metawidget configuration.
   */
app.factory( 'mwConfig', function( $http ) {

  return {

    form: {
      inspector: new metawidget.inspector.CompositeInspector( [ new metawidget.inspector.PropertyTypeInspector(), function( toInspect, type, names ) {

        //check if customer.address inpection
        if ( names !== undefined && names.length === 2 && names[0] === 'customer' && names[1] === 'address' ) {
          // address client-side schema
          return {
            properties: {
              street: {
                type: "string",
                required: true
              },
              city: {
                type: "string",
                required: true
              },
              state: {
                "enum": [ "NSW", "QLD", "SA", "TAS" ],
                required: true
              },
              postcode: {
                type: "integer",
                required: true
              }
            }
          };
        }
        //check is customer inspection -> customer client-side schema
        if (names !== undefined && names.length === 1 && names[0] === 'customer') {
          return {
            properties: {
              id: {
                hidden: true
              },
              title: {
                enum: [ "Mr", "Mrs", "Miss" ],
                required: true
              },
              firstname: {
                type: "string",
                title: "First Name",
                required: true
              },
              lastname: {
                type: "string",
                title: "Last Name",
                required: true
              },
              gender: {
                "enum": [ "Male", "Female" ],
                required: true
              },
              dob: {
                "type": "date",
                "title": "Date of Birth",
                required: true
              },
              address: {
                "section": "Address Details",
                required: true
              }
            }
          }
        }
      } ] ),

      inspectionResultProcessors: [ function( inspectionResult, mw, toInspect, type, names ) {
        // account -> server-side, asynchronous schema
        if ( names === undefined && toInspect !== undefined && toInspect.type !== undefined ) {
          $http.get( '../data/account-schema.json' ).then( function( result ) {
            metawidget.util.combineInspectionResults( inspectionResult, result.data );
            mw.buildWidgets( inspectionResult );
          } );
        } else {
          return inspectionResult;
        }
      } ]
    },

    // For the button bar
    buttons: {
      inspector: new metawidget.inspector.CompositeInspector( [ new metawidget.inspector.PropertyTypeInspector(), function() {
        return {
          properties: {
            edit: {
              hidden: '{{!current.id || current.closed !== undefined || !readOnly}}'
            },
            save: {
              hidden: "{{readOnly || current.closed !== undefined}}"
            },
            delete: {
              title: 'Close Account',
              hidden: "{{current.closed !== undefined}}"
            }
          }
        };
      } ] ),
      layout: new metawidget.layout.SimpleLayout()
    },

    simple: {
      inspector: new metawidget.inspector.PropertyTypeInspector(),
      layout: new metawidget.layout.SimpleLayout()
    }

  }
});