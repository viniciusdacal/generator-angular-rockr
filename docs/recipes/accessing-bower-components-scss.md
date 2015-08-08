# Accessing 'bower_components' in .scss files without having to path ../../bower_components/

## [#550](https://github.com/Swiip/generator-gulp-angular/issues/550)

```javascript
var sassOptions = {
  loadPath: [ options.src + '/../bower_components/my-styles/'],
  style: 'expanded'
};
```
