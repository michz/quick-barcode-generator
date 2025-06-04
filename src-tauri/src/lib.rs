// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//use tauri::Manager;

//// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//#[tauri::command]
//fn greet(name: &str) -> String {
//    format!("Hello, {}! You've been greeted from Rust!", name)
//}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_cli::init())
        //.setup(|app| {
        //  #[cfg(debug_assertions)] // only include this code on debug builds
        //  {
        //    let window = app.get_webview_window("main").unwrap();
        //    window.open_devtools();
        //    //window.close_devtools();
        //  }
        //  Ok(())
        //})
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
