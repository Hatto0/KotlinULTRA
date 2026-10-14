export type IdeFile = {
  path: string;
  content: string;
};

export const PROJECT_NAME = "EmptyProject.ku";

export const WELCOME_PATH = "WELCOME.md";

export const seedFiles: IdeFile[] = [
  {
    path: "WELCOME.md",
    content: `# Kotlin ULTRA

Mobile-first IDE for iOS and Android — Xcode density, Android Studio tooling, agentic flow.

## Try this
- Open \`iosApp/UltraWeather/ContentView.swift\` and change a \`Text\` string. Preview updates live.
- Open \`app/src/main/kotlin/com/ultra/weather/ui/HomeScreen.kt\` and tap Run on Android.
- Open the Kali terminal. Type \`help\`, then \`kali-upgrade\`.
- Ask Grok to add a forecast row, or deploy an AI swarm with that mission.
- Clone a public GitHub repo from Integrations.

Current target: **${PROJECT_NAME}** · Kotlin Multiplatform + SwiftUI + Compose
`,
  },
  {
    path: "settings.gradle.kts",
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

rootProject.name = "UltraWeather"
include(":app")
include(":shared")
`,
  },
  {
    path: "shared/src/commonMain/kotlin/Weather.kt",
    content: `package com.ultra.weather.shared

data class Weather(
    val city: String,
    val tempF: Int,
    val condition: String,
    val high: Int,
    val low: Int,
    val windMph: Int,
)

object WeatherRepository {
    fun now(): Weather = Weather(
        city = "San Francisco",
        tempF = 72,
        condition = "Clear",
        high = 76,
        low = 61,
        windMph = 8,
    )
}
`,
  },
  {
    path: "app/src/main/kotlin/com/ultra/weather/MainActivity.kt",
    content: `package com.ultra.weather

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.ultra.weather.ui.HomeScreen
import com.ultra.weather.ui.theme.UltraTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UltraTheme {
                HomeScreen()
            }
        }
    }
}
`,
  },
  {
    path: "app/src/main/kotlin/com/ultra/weather/ui/HomeScreen.kt",
    content: `package com.ultra.weather.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ultra.weather.shared.WeatherRepository

@Composable
fun HomeScreen() {
    val weather = WeatherRepository.now()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(28.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
        horizontalAlignment = Alignment.Start,
    ) {
        Text(weather.city, fontSize = 16.sp)
        Text("\${weather.tempF}°", fontSize = 72.sp)
        Text(weather.condition, fontSize = 22.sp)
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Text("H: \${weather.high}°")
            Text("L: \${weather.low}°")
        }
        Text("Wind \${weather.windMph} mph")
    }
}
`.replace(/\\\$/g, "$"),
  },
  {
    path: "app/src/main/kotlin/com/ultra/weather/ui/theme/Theme.kt",
    content: `package com.ultra.weather.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val UltraDark = darkColorScheme(
    background = Color(0xFF07080C),
    surface = Color(0xFF111318),
    onBackground = Color(0xFFECEEF2),
    primary = Color(0xFFC5CCD6),
)

@Composable
fun UltraTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = UltraDark, content = content)
}
`,
  },
  {
    path: "app/src/main/res/values/themes.xml",
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.UltraWeather" parent="android:Theme.Material.NoActionBar">
        <item name="android:statusBarColor">#07080C</item>
        <item name="android:navigationBarColor">#07080C</item>
        <item name="android:windowBackground">#07080C</item>
    </style>
</resources>
`,
  },
  {
    path: "iosApp/UltraWeather/ContentView.swift",
    content: `import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("San Francisco")
            Text("72°")
            Text("Clear")
            HStack(spacing: 16) {
                Text("H: 76°")
                Text("L: 61°")
            }
            Text("Wind 8 mph")
        }
        .padding(28)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(Color.black)
        .foregroundStyle(Color.white)
    }
}

#Preview {
    ContentView()
}
`,
  },
  {
    path: "iosApp/UltraWeather/WeatherCard.swift",
    content: `import SwiftUI

struct WeatherCard: View {
    let city: String
    let temp: Int
    let condition: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(city)
            Text("\\(temp)°")
            Text(condition)
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}
`,
  },
  {
    path: "iosApp/UltraWeather/UltraWeatherApp.swift",
    content: `import SwiftUI

@main
struct UltraWeatherApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
`,
  },
  {
    path: "iosApp/Info.plist",
    content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>UltraWeather</string>
    <key>CFBundleIdentifier</key>
    <string>com.ultra.weather</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>UILaunchScreen</key>
    <dict/>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
</dict>
</plist>
`,
  },
  {
    path: "preview/index.html",
    content: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UltraWeather WebKit</title>
    <style>
      html, body { margin: 0; height: 100%; background: #07080c; color: #eceef2;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { padding: 28px; }
      .city { font-size: 16px; opacity: 0.72; letter-spacing: 0.04em; }
      .temp { font-size: 72px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; margin: 8px 0; }
      .cond { font-size: 22px; }
      .row { display: flex; gap: 16px; margin-top: 10px; opacity: 0.8; }
    </style>
  </head>
  <body>
    <main>
      <div class="city">San Francisco</div>
      <div class="temp">72°</div>
      <div class="cond">Clear</div>
      <div class="row"><span>H: 76°</span><span>L: 61°</span></div>
      <div class="row">Wind 8 mph</div>
    </main>
  </body>
</html>
`,
  },
];
