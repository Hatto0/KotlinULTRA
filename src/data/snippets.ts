export type Snippet = {
  id: string;
  title: string;
  platform: "ios" | "android" | "kmp" | "web";
  language: string;
  description: string;
  code: string;
};

export const snippets: Snippet[] = [
  {
    id: "swiftui-card",
    title: "SwiftUI glass card",
    platform: "ios",
    language: "swift",
    description: "Material card with city and temperature.",
    code: `struct GlassCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("San Francisco")
            Text("72°")
            Text("Clear")
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}
`,
  },
  {
    id: "swiftui-list",
    title: "Forecast list",
    platform: "ios",
    language: "swift",
    description: "Hourly forecast using List.",
    code: `struct ForecastList: View {
    let hours = ["Now", "1PM", "2PM", "3PM"]
    var body: some View {
        List(hours, id: \\.self) { hour in
            HStack {
                Text(hour)
                Spacer()
                Text("72°")
            }
        }
    }
}
`,
  },
  {
    id: "compose-scaffold",
    title: "Compose scaffold",
    platform: "android",
    language: "kotlin",
    description: "Material3 scaffold with a FAB.",
    code: `@Composable
fun WeatherScaffold() {
    Scaffold(
        floatingActionButton = {
            FloatingActionButton(onClick = {}) { Text("+") }
        }
    ) { padding ->
        Column(Modifier.padding(padding).padding(24.dp)) {
            Text("San Francisco")
            Text("72°")
        }
    }
}
`,
  },
  {
    id: "compose-row",
    title: "Metric chips",
    platform: "android",
    language: "kotlin",
    description: "Row of compact weather metrics.",
    code: `@Composable
fun MetricRow() {
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("H: 76°")
        Text("L: 61°")
        Text("UV 4")
        Text("Wind 8")
    }
}
`,
  },
  {
    id: "kmp-repo",
    title: "Shared repository",
    platform: "kmp",
    language: "kotlin",
    description: "expect/actual-ready weather model.",
    code: `data class Hourly(val hour: String, val tempF: Int)

expect fun platformName(): String

class ForecastRepo {
    fun nextFour(): List<Hourly> = listOf(
        Hourly("Now", 72),
        Hourly("1PM", 73),
        Hourly("2PM", 74),
        Hourly("3PM", 73),
    )
}
`,
  },
  {
    id: "gradle-kmp",
    title: "KMP android+ios",
    platform: "kmp",
    language: "kotlin",
    description: "shared module targets.",
    code: `kotlin {
    androidTarget()
    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework { baseName = "Shared"; isStatic = true }
    }
    sourceSets {
        commonMain.dependencies { implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0") }
    }
}
`,
  },
  {
    id: "webkit-hero",
    title: "WebKit hero",
    platform: "web",
    language: "html",
    description: "Device-ready HTML weather hero.",
    code: `<main style="padding:28px;font-family:-apple-system,sans-serif;background:#07080c;color:#eceef2;height:100%">
  <div style="opacity:.7">San Francisco</div>
  <div style="font-size:72px;letter-spacing:-.04em">72°</div>
  <div>Clear</div>
</main>
`,
  },
  {
    id: "swift-nav",
    title: "Navigation stack",
    platform: "ios",
    language: "swift",
    description: "iOS 16+ NavigationStack.",
    code: `struct RootNav: View {
    var body: some View {
        NavigationStack {
            ContentView()
                .navigationTitle("UltraWeather")
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        Button("Radar") {}
                    }
                }
        }
    }
}
`,
  },
];
