<?php

    namespace kyra\map;

    use yii\web\AssetBundle;
    use yii\web\View;

    class MapAsset extends AssetBundle
    {
        public $sourcePath = '@vendor/kyra/yii2-kyra-map/assets';
        public $js = [
            'https://maps.googleapis.com/maps/api/js?libraries=places',
            'gmaps.js',
            'mapdrag.js',
        ];
        public $css = [
        ];
        public $depends = [
            'yii\web\JqueryAsset',
        ];
    }