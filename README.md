# transitdata-apc-protobuf-json-transformer

Transform APC messages from Protobuf back to JSON.

For internal use at HSL, we need to redeliver the expanded and combined APC messages back to the MQTT broker.
First the messages need to be transformed from Protobuf back to original APC JSON.

This project depends indirectly on [transitdata-common](https://github.com/HSLdevcom/transitdata-common) project for its Protobuf proto definition files though the files have been slightly modified.
