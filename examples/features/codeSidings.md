---
elm:
  dependencies:
    gicentre/elm-vega: latest
---

```elm {l=hidden}
import VegaLite exposing (..)


globe : Projection -> List ProjectionProperty -> Spec
globe proj props =
    let
        pDetails =
            [ width 300, height 150, projection (PType proj :: props) ]

        graticuleSpec =
            asSpec
                (pDetails
                    ++ [ dataFromUrl "https://gicentre.github.io/data/geoTutorials/graticule.json" [ TopojsonMesh "graticule" ]
                       , mark Geoshape [ MFilled False, MStroke "#000", MStrokeWidth 0.1 ]
                       ]
                )

        countrySpec =
            asSpec
                (pDetails
                    ++ [ dataFromUrl "https://gicentre.github.io/data/geoTutorials/world-110m.json" [ TopojsonFeature "countries1" ]
                       , mark Geoshape [ MStroke "white", MFill "#232", MOpacity 0.7, MStrokeWidth 0.1 ]
                       ]
                )
    in
    toVegaLite
        [ configure (configuration (View [ Stroke Nothing ]) [])
        , layer [ graticuleSpec, countrySpec ]
        ]
```

# Map Projections

```elm {v siding}
projectedGlobe : Spec
projectedGlobe =
    globe Equirectangular []
```

```elm {v}
projectedGlobe : Spec
projectedGlobe =
    globe Orthographic []
```
