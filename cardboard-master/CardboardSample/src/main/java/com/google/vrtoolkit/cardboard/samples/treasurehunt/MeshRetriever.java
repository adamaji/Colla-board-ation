package com.google.vrtoolkit.cardboard.samples.treasurehunt;

import android.os.AsyncTask;
import android.util.Log;

import com.momchil_atanasov.data.front.parser.IOBJParser;
import com.momchil_atanasov.data.front.parser.OBJModel;
import com.momchil_atanasov.data.front.parser.OBJParser;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

/**
 * Created by adam on 11/16/14.
 */
public class MeshRetriever extends AsyncTask<String, Void, OBJModel> {
    private Exception exception;

    protected OBJModel doInBackground(String... urls){
        try {
            final URL url = new URL("http://www.cs.unc.edu/~aji/para.obj");
            final InputStream in = url.openStream();
            final IOBJParser parser = new OBJParser();
            final OBJModel model = parser.parse( in );

            //System.out.println( "YO YO YO YO YO: " + model.getVertices().size() );
            //Log.w("EVERYTHING IS AWESOME", "YO YO YO YO YO: " + model.getVertices().size());

            in.close();

            return model;

        } catch (IOException e) {
            //System.out.println( "no go :(((((((( " );
            //Log.w("EVERYTHING IS not AWESOME", "YO YO YO YO YO: ");
            e.printStackTrace();
            this.exception = e;
        }
        return null;
    }

    protected void onPostExecute(OBJModel model){

    }
}
