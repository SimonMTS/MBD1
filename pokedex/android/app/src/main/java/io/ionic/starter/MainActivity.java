package io.ionic.starter;

import android.net.http.SslError;
import android.os.Bundle;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import com.getcapacitor.Plugin;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    if (BuildConfig.DEBUG) {
      this.bridge.getWebView().setWebViewClient(new BridgeWebViewClient(this.bridge) {
        @Override
        public void onReceivedSslError(WebView view, final SslErrorHandler handler, SslError error) {
          handler.proceed();
        }
      });
    }

    TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
      public X509Certificate[] getAcceptedIssuers() {
        return null;
      }

      @Override
      public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
        // Not implemented
      }

      @Override
      public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
        // Not implemented
      }
    }};

    try {
      SSLContext sc = null;
      try {
        sc = SSLContext.getInstance("TLS");
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }

      sc.init(null, trustAllCerts, new java.security.SecureRandom());

      HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
      HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() { @Override public boolean verify(String hostname, SSLSession session) { return true; } });
    } catch (KeyManagementException e) {
      e.printStackTrace();
    }
  }
}
